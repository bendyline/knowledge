import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {verifyRemote} from '../src/remote-verification.mjs';
const bytes=Buffer.from('abcdefghij');
const sha=createHash('sha256').update(bytes).digest('hex');
test('range verification retries only the interrupted segment and hashes every byte',async()=>{
 const requests=[];let interrupted=false;
 const fetchImpl=async(_url,{headers})=>{
  const range=headers.Range;requests.push(range);const[,a,b]=/bytes=(\d+)-(\d+)/.exec(range);const start=Number(a),end=Number(b);
  if(start===4&&!interrupted){interrupted=true;let sent=false;return new Response(new ReadableStream({pull(c){if(!sent){sent=true;c.enqueue(bytes.subarray(start,start+2));}else c.error(new TypeError('terminated'));}}),{status:206,headers:{'Content-Range':`bytes ${start}-${end}/10`}});}
  return new Response(bytes.subarray(start,end+1),{status:206,headers:{'Content-Range':`bytes ${start}-${end}/10`}});
 };
 await verifyRemote('https://example.test/file',sha,10,{}, {rangeBytes:4,concurrency:1,fetchImpl,retryDelayMs:0});
 assert.deepEqual(requests,['bytes=0-3','bytes=4-7','bytes=4-7','bytes=8-9']);
});
test('parallel ranges are hashed in file order, with a smaller final range',async()=>{
 const completed=[];
 const fetchImpl=async(_url,{headers})=>{const[,a,b]=/bytes=(\d+)-(\d+)/.exec(headers.Range);const start=Number(a),end=Number(b);
  if(start===4)await new Promise(r=>setTimeout(r,20));completed.push(start);
  return new Response(bytes.subarray(start,end+1),{status:206,headers:{'Content-Range':`bytes ${start}-${end}/10`}});
 };
 await verifyRemote('https://example.test/file',sha,10,{}, {rangeBytes:4,concurrency:2,fetchImpl,retryDelayMs:0});
 assert.deepEqual(completed,[0,8,4]);
});
test('verification rejects incorrect ranges and digests, and supports complete-file fallback',async()=>{
 const opts={rangeBytes:4,retryDelayMs:0};
 await assert.rejects(verifyRemote('https://example.test/file',sha,10,{}, {...opts,fetchImpl:async()=>new Response('abcd',{status:206,headers:{'Content-Range':'bytes 1-4/10'}})}),/range does not match/);
 await assert.rejects(verifyRemote('https://example.test/file','0'.repeat(64),10,{}, {...opts,fetchImpl:async()=>new Response(bytes)}),/digest\/size mismatch/);
 await verifyRemote('https://example.test/file',sha,10,{}, {...opts,fetchImpl:async()=>new Response(bytes)});
});

test('transient HTTP failures retry within the limit while terminal failures stop', async () => {
 let calls=0;
 const opts={rangeBytes:20,attempts:2,retryDelayMs:0};
 await verifyRemote('https://example.test/file',sha,10,{Authorization:'Bearer test'}, {...opts,fetchImpl:async(_url,{headers})=>{
  assert.equal(headers.Authorization,'Bearer test');
  assert.equal(headers['Accept-Encoding'],'identity');
  return ++calls===1?new Response(null,{status:503}):new Response(bytes);
 }});
 assert.equal(calls,2);
 calls=0;
 await assert.rejects(verifyRemote('https://example.test/file',sha,10,{}, {...opts,fetchImpl:async()=>{calls++;return new Response(null,{status:404});}}),/HTTP 404/);
 assert.equal(calls,1);
 calls=0;
 await assert.rejects(verifyRemote('https://example.test/file',sha,10,{}, {...opts,fetchImpl:async()=>{calls++;throw new TypeError('network down');}}),/network down/);
 assert.equal(calls,2);
});

test('partial and oversized payloads never pass verification', async () => {
 const opts={rangeBytes:4,retryDelayMs:0};
 for(const body of ['ab','abcde']){
  await assert.rejects(verifyRemote('https://example.test/file',sha,10,{}, {...opts,fetchImpl:async()=>new Response(body,{status:206,headers:{'Content-Range':'bytes 0-3/10'}})}),/incomplete|larger than expected/);
 }
 await assert.rejects(verifyRemote('https://example.test/file',sha,10,{}, {rangeBytes:20,fetchImpl:async()=>new Response('abcdefghi')}),/digest\/size mismatch/);
 await assert.rejects(verifyRemote('https://example.test/file',sha,10,{}, {rangeBytes:20,fetchImpl:async()=>new Response('abcdefghijk')}),/larger than expected/);
});

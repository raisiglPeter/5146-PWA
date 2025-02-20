let e;var t,n,s,o,i,a,r,l,c,d,u,h,f,p,m,g,E,y,C,v,O,I,_,b,T=globalThis,w={},S={},R=T.parcelRequire94c2;null==R&&((R=function(e){if(e in w)return w[e].exports;if(e in S){var t=S[e];delete S[e];var n={id:e,exports:{}};return w[e]=n,t.call(n.exports,n,n.exports),n.exports}var s=Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){S[e]=t},T.parcelRequire94c2=R),R.register,(t=f||(f={})).STRING="string",t.NUMBER="number",t.INTEGER="integer",t.BOOLEAN="boolean",t.ARRAY="array",t.OBJECT="object",(n=p||(p={})).LANGUAGE_UNSPECIFIED="language_unspecified",n.PYTHON="python",(s=m||(m={})).OUTCOME_UNSPECIFIED="outcome_unspecified",s.OUTCOME_OK="outcome_ok",s.OUTCOME_FAILED="outcome_failed",s.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A=["user","model","function","system"];(o=g||(g={})).HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",o.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",o.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",o.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",o.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",(i=E||(E={})).HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",i.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",i.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",i.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",i.BLOCK_NONE="BLOCK_NONE",(a=y||(y={})).HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",a.NEGLIGIBLE="NEGLIGIBLE",a.LOW="LOW",a.MEDIUM="MEDIUM",a.HIGH="HIGH",(r=C||(C={})).BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",r.SAFETY="SAFETY",r.OTHER="OTHER",(l=v||(v={})).FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",l.STOP="STOP",l.MAX_TOKENS="MAX_TOKENS",l.SAFETY="SAFETY",l.RECITATION="RECITATION",l.LANGUAGE="LANGUAGE",l.OTHER="OTHER",(c=O||(O={})).TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",c.RETRIEVAL_QUERY="RETRIEVAL_QUERY",c.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",c.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",c.CLASSIFICATION="CLASSIFICATION",c.CLUSTERING="CLUSTERING",(d=I||(I={})).MODE_UNSPECIFIED="MODE_UNSPECIFIED",d.AUTO="AUTO",d.ANY="ANY",d.NONE="NONE",(u=_||(_={})).MODE_UNSPECIFIED="MODE_UNSPECIFIED",u.MODE_DYNAMIC="MODE_DYNAMIC";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N extends Error{constructor(e){super(`[GoogleGenerativeAI Error]: ${e}`)}}class M extends N{constructor(e,t){super(e),this.response=t}}class x extends N{constructor(e,t,n,s){super(e),this.status=t,this.statusText=n,this.errorDetails=s}}class L extends N{}(h=b||(b={})).GENERATE_CONTENT="generateContent",h.STREAM_GENERATE_CONTENT="streamGenerateContent",h.COUNT_TOKENS="countTokens",h.EMBED_CONTENT="embedContent",h.BATCH_EMBED_CONTENTS="batchEmbedContents";class D{constructor(e,t,n,s,o){this.model=e,this.task=t,this.apiKey=n,this.stream=s,this.requestOptions=o}toString(){var e,t;let n=(null===(e=this.requestOptions)||void 0===e?void 0:e.apiVersion)||"v1beta",s=(null===(t=this.requestOptions)||void 0===t?void 0:t.baseUrl)||"https://generativelanguage.googleapis.com",o=`${s}/${n}/${this.model}:${this.task}`;return this.stream&&(o+="?alt=sse"),o}}async function k(e){var t;let n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",function(e){let t=[];return(null==e?void 0:e.apiClient)&&t.push(e.apiClient),t.push("genai-js/0.21.0"),t.join(" ")}(e.requestOptions)),n.append("x-goog-api-key",e.apiKey);let s=null===(t=e.requestOptions)||void 0===t?void 0:t.customHeaders;if(s){if(!(s instanceof Headers))try{s=new Headers(s)}catch(e){throw new L(`unable to convert customHeaders value ${JSON.stringify(s)} to Headers: ${e.message}`)}for(let[e,t]of s.entries()){if("x-goog-api-key"===e)throw new L(`Cannot set reserved header name ${e}`);if("x-goog-api-client"===e)throw new L(`Header name ${e} can only be set using the apiClient field`);n.append(e,t)}}return n}async function B(e,t,n,s,o,i){let a=new D(e,t,n,s,i);return{url:a.toString(),fetchOptions:Object.assign(Object.assign({},function(e){let t={};if((null==e?void 0:e.signal)!==void 0||(null==e?void 0:e.timeout)>=0){let n=new AbortController;(null==e?void 0:e.timeout)>=0&&setTimeout(()=>n.abort(),e.timeout),(null==e?void 0:e.signal)&&e.signal.addEventListener("abort",()=>{n.abort()}),t.signal=n.signal}return t}(i)),{method:"POST",headers:await k(a),body:o})}}async function H(e,t,n,s,o,i={},a=fetch){let{url:r,fetchOptions:l}=await B(e,t,n,s,o,i);return $(r,l,a)}async function $(e,t,n=fetch){let s;try{s=await n(e,t)}catch(t){!function(e,t){let n=e;throw e instanceof x||e instanceof L||((n=new N(`Error fetching from ${t.toString()}: ${e.message}`)).stack=e.stack),n}(t,e)}return s.ok||await U(s,e),s}async function U(e,t){let n,s="";try{let t=await e.json();s=t.error.message,t.error.details&&(s+=` ${JSON.stringify(t.error.details)}`,n=t.error.details)}catch(e){}throw new x(`Error fetching from ${t.toString()}: [${e.status} ${e.statusText}] ${s}`,e.status,e.statusText,n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),G(e.candidates[0]))throw new M(`${q(e)}`,e);return function(e){var t,n,s,o;let i=[];if(null===(n=null===(t=e.candidates)||void 0===t?void 0:t[0].content)||void 0===n?void 0:n.parts)for(let t of null===(o=null===(s=e.candidates)||void 0===s?void 0:s[0].content)||void 0===o?void 0:o.parts)t.text&&i.push(t.text),t.executableCode&&i.push("\n```"+t.executableCode.language+"\n"+t.executableCode.code+"\n```\n"),t.codeExecutionResult&&i.push("\n```\n"+t.codeExecutionResult.output+"\n```\n");return i.length>0?i.join(""):""}(e)}if(e.promptFeedback)throw new M(`Text not available. ${q(e)}`,e);return""},e.functionCall=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),G(e.candidates[0]))throw new M(`${q(e)}`,e);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),j(e)[0]}if(e.promptFeedback)throw new M(`Function call not available. ${q(e)}`,e)},e.functionCalls=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),G(e.candidates[0]))throw new M(`${q(e)}`,e);return j(e)}if(e.promptFeedback)throw new M(`Function call not available. ${q(e)}`,e)},e}function j(e){var t,n,s,o;let i=[];if(null===(n=null===(t=e.candidates)||void 0===t?void 0:t[0].content)||void 0===n?void 0:n.parts)for(let t of null===(o=null===(s=e.candidates)||void 0===s?void 0:s[0].content)||void 0===o?void 0:o.parts)t.functionCall&&i.push(t.functionCall);return i.length>0?i:void 0}const F=[v.RECITATION,v.SAFETY,v.LANGUAGE];function G(e){return!!e.finishReason&&F.includes(e.finishReason)}function q(e){var t,n,s;let o="";if((!e.candidates||0===e.candidates.length)&&e.promptFeedback)o+="Response was blocked",(null===(t=e.promptFeedback)||void 0===t?void 0:t.blockReason)&&(o+=` due to ${e.promptFeedback.blockReason}`),(null===(n=e.promptFeedback)||void 0===n?void 0:n.blockReasonMessage)&&(o+=`: ${e.promptFeedback.blockReasonMessage}`);else if(null===(s=e.candidates)||void 0===s?void 0:s[0]){let t=e.candidates[0];G(t)&&(o+=`Candidate was blocked due to ${t.finishReason}`,t.finishMessage&&(o+=`: ${t.finishMessage}`))}return o}function K(e){return this instanceof K?(this.v=e,this):new K(e)}"function"==typeof SuppressedError&&SuppressedError;/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function J(e){let t=[],n=e.getReader();for(;;){let{done:e,value:s}=await n.read();if(e)return P(function(e){let t=e[e.length-1],n={promptFeedback:null==t?void 0:t.promptFeedback};for(let t of e){if(t.candidates)for(let e of t.candidates){let t=e.index;if(n.candidates||(n.candidates=[]),n.candidates[t]||(n.candidates[t]={index:e.index}),n.candidates[t].citationMetadata=e.citationMetadata,n.candidates[t].groundingMetadata=e.groundingMetadata,n.candidates[t].finishReason=e.finishReason,n.candidates[t].finishMessage=e.finishMessage,n.candidates[t].safetyRatings=e.safetyRatings,e.content&&e.content.parts){n.candidates[t].content||(n.candidates[t].content={role:e.content.role||"user",parts:[]});let s={};for(let o of e.content.parts)o.text&&(s.text=o.text),o.functionCall&&(s.functionCall=o.functionCall),o.executableCode&&(s.executableCode=o.executableCode),o.codeExecutionResult&&(s.codeExecutionResult=o.codeExecutionResult),0===Object.keys(s).length&&(s.text=""),n.candidates[t].content.parts.push(s)}}t.usageMetadata&&(n.usageMetadata=t.usageMetadata)}return n}(t));t.push(s)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function W(e,t,n,s){return function(e){let[t,n]=(function(e){let t=e.getReader();return new ReadableStream({start(e){let n="";return function s(){return t.read().then(({value:t,done:o})=>{let i;if(o){if(n.trim()){e.error(new N("Failed to parse stream"));return}e.close();return}let a=(n+=t).match(Y);for(;a;){try{i=JSON.parse(a[1])}catch(t){e.error(new N(`Error parsing JSON response: "${a[1]}"`));return}e.enqueue(i),a=(n=n.substring(a[0].length)).match(Y)}return s()})}()}})})(e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0}))).tee();return{stream:function(e){return function(e,t,n){if(!Symbol.asyncIterator)throw TypeError("Symbol.asyncIterator is not defined.");var s,o=n.apply(e,t||[]),i=[];return s={},a("next"),a("throw"),a("return"),s[Symbol.asyncIterator]=function(){return this},s;function a(e){o[e]&&(s[e]=function(t){return new Promise(function(n,s){i.push([e,t,n,s])>1||r(e,t)})})}function r(e,t){try{var n;(n=o[e](t)).value instanceof K?Promise.resolve(n.value.v).then(l,c):d(i[0][2],n)}catch(e){d(i[0][3],e)}}function l(e){r("next",e)}function c(e){r("throw",e)}function d(e,t){e(t),i.shift(),i.length&&r(i[0][0],i[0][1])}}(this,arguments,function*(){let t=e.getReader();for(;;){let{value:e,done:n}=yield K(t.read());if(n)break;yield yield K(P(e))}})}(t),response:J(n)}}(await H(t,b.STREAM_GENERATE_CONTENT,e,!0,JSON.stringify(n),s))}async function V(e,t,n,s){let o=await H(t,b.GENERATE_CONTENT,e,!1,JSON.stringify(n),s);return{response:P(await o.json())}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X(e){if(null!=e){if("string"==typeof e)return{role:"system",parts:[{text:e}]};if(e.text)return{role:"system",parts:[e]};if(e.parts)return e.role?e:{role:"system",parts:e.parts}}}function Q(e){let t=[];if("string"==typeof e)t=[{text:e}];else for(let n of e)"string"==typeof n?t.push({text:n}):t.push(n);return function(e){let t={role:"user",parts:[]},n={role:"function",parts:[]},s=!1,o=!1;for(let i of e)"functionResponse"in i?(n.parts.push(i),o=!0):(t.parts.push(i),s=!0);if(s&&o)throw new N("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!s&&!o)throw new N("No content is provided for sending chat message.");return s?t:n}(t)}function z(e){let t;return t=e.contents?e:{contents:[Q(e)]},e.systemInstruction&&(t.systemInstruction=X(e.systemInstruction)),t}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],ee={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]},et="SILENT_ERROR";class en{constructor(e,t,n,s={}){this.model=t,this.params=n,this._requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=e,(null==n?void 0:n.history)&&(function(e){let t=!1;for(let n of e){let{role:e,parts:s}=n;if(!t&&"user"!==e)throw new N(`First content should be with role 'user', got ${e}`);if(!A.includes(e))throw new N(`Each item should include role field. Got ${e} but valid roles are: ${JSON.stringify(A)}`);if(!Array.isArray(s))throw new N("Content should have 'parts' property with an array of Parts");if(0===s.length)throw new N("Each Content should have at least one part");let o={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(let e of s)for(let t of Z)t in e&&(o[t]+=1);let i=ee[e];for(let t of Z)if(!i.includes(t)&&o[t]>0)throw new N(`Content with role '${e}' can't contain '${t}' part`);t=!0}}(n.history),this._history=n.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e,t={}){var n,s,o,i,a,r;let l;await this._sendPromise;let c=Q(e),d={safetySettings:null===(n=this.params)||void 0===n?void 0:n.safetySettings,generationConfig:null===(s=this.params)||void 0===s?void 0:s.generationConfig,tools:null===(o=this.params)||void 0===o?void 0:o.tools,toolConfig:null===(i=this.params)||void 0===i?void 0:i.toolConfig,systemInstruction:null===(a=this.params)||void 0===a?void 0:a.systemInstruction,cachedContent:null===(r=this.params)||void 0===r?void 0:r.cachedContent,contents:[...this._history,c]},u=Object.assign(Object.assign({},this._requestOptions),t);return this._sendPromise=this._sendPromise.then(()=>V(this._apiKey,this.model,d,u)).then(e=>{var t;if(e.response.candidates&&e.response.candidates.length>0){this._history.push(c);let n=Object.assign({parts:[],role:"model"},null===(t=e.response.candidates)||void 0===t?void 0:t[0].content);this._history.push(n)}else{let t=q(e.response);t&&console.warn(`sendMessage() was unsuccessful. ${t}. Inspect response object for details.`)}l=e}),await this._sendPromise,l}async sendMessageStream(e,t={}){var n,s,o,i,a,r;await this._sendPromise;let l=Q(e),c={safetySettings:null===(n=this.params)||void 0===n?void 0:n.safetySettings,generationConfig:null===(s=this.params)||void 0===s?void 0:s.generationConfig,tools:null===(o=this.params)||void 0===o?void 0:o.tools,toolConfig:null===(i=this.params)||void 0===i?void 0:i.toolConfig,systemInstruction:null===(a=this.params)||void 0===a?void 0:a.systemInstruction,cachedContent:null===(r=this.params)||void 0===r?void 0:r.cachedContent,contents:[...this._history,l]},d=Object.assign(Object.assign({},this._requestOptions),t),u=W(this._apiKey,this.model,c,d);return this._sendPromise=this._sendPromise.then(()=>u).catch(e=>{throw Error(et)}).then(e=>e.response).then(e=>{if(e.candidates&&e.candidates.length>0){this._history.push(l);let t=Object.assign({},e.candidates[0].content);t.role||(t.role="model"),this._history.push(t)}else{let t=q(e);t&&console.warn(`sendMessageStream() was unsuccessful. ${t}. Inspect response object for details.`)}}).catch(e=>{e.message!==et&&console.error(e)}),u}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function es(e,t,n,s){return(await H(t,b.COUNT_TOKENS,e,!1,JSON.stringify(n),s)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eo(e,t,n,s){return(await H(t,b.EMBED_CONTENT,e,!1,JSON.stringify(n),s)).json()}async function ei(e,t,n,s){let o=n.requests.map(e=>Object.assign(Object.assign({},e),{model:t}));return(await H(t,b.BATCH_EMBED_CONTENTS,e,!1,JSON.stringify({requests:o}),s)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ea{constructor(e,t,n={}){this.apiKey=e,this._requestOptions=n,t.model.includes("/")?this.model=t.model:this.model=`models/${t.model}`,this.generationConfig=t.generationConfig||{},this.safetySettings=t.safetySettings||[],this.tools=t.tools,this.toolConfig=t.toolConfig,this.systemInstruction=X(t.systemInstruction),this.cachedContent=t.cachedContent}async generateContent(e,t={}){var n;let s=z(e),o=Object.assign(Object.assign({},this._requestOptions),t);return V(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(n=this.cachedContent)||void 0===n?void 0:n.name},s),o)}async generateContentStream(e,t={}){var n;let s=z(e),o=Object.assign(Object.assign({},this._requestOptions),t);return W(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(n=this.cachedContent)||void 0===n?void 0:n.name},s),o)}startChat(e){var t;return new en(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(t=this.cachedContent)||void 0===t?void 0:t.name},e),this._requestOptions)}async countTokens(e,t={}){let n=function(e,t){var n;let s={model:null==t?void 0:t.model,generationConfig:null==t?void 0:t.generationConfig,safetySettings:null==t?void 0:t.safetySettings,tools:null==t?void 0:t.tools,toolConfig:null==t?void 0:t.toolConfig,systemInstruction:null==t?void 0:t.systemInstruction,cachedContent:null===(n=null==t?void 0:t.cachedContent)||void 0===n?void 0:n.name,contents:[]},o=null!=e.generateContentRequest;if(e.contents){if(o)throw new L("CountTokensRequest must have one of contents or generateContentRequest, not both.");s.contents=e.contents}else if(o)s=Object.assign(Object.assign({},s),e.generateContentRequest);else{let t=Q(e);s.contents=[t]}return{generateContentRequest:s}}(e,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),s=Object.assign(Object.assign({},this._requestOptions),t);return es(this.apiKey,this.model,n,s)}async embedContent(e,t={}){let n="string"==typeof e||Array.isArray(e)?{content:Q(e)}:e,s=Object.assign(Object.assign({},this._requestOptions),t);return eo(this.apiKey,this.model,n,s)}async batchEmbedContents(e,t={}){let n=Object.assign(Object.assign({},this._requestOptions),t);return ei(this.apiKey,this.model,e,n)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er{constructor(e){this.apiKey=e}getGenerativeModel(e,t){if(!e.model)throw new N("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new ea(this.apiKey,e,t)}getGenerativeModelFromCachedContent(e,t,n){if(!e.name)throw new L("Cached content must contain a `name` field.");if(!e.model)throw new L("Cached content must contain a `model` field.");for(let n of["model","systemInstruction"])if((null==t?void 0:t[n])&&e[n]&&(null==t?void 0:t[n])!==e[n]){if("model"===n&&(t.model.startsWith("models/")?t.model.replace("models/",""):t.model)===(e.model.startsWith("models/")?e.model.replace("models/",""):e.model))continue;throw new L(`Different value for "${n}" specified in modelParams (${t[n]}) and cachedContent (${e[n]})`)}let s=Object.assign(Object.assign({},t),{model:e.model,tools:e.tools,toolConfig:e.toolConfig,systemInstruction:e.systemInstruction,cachedContent:e});return new ea(this.apiKey,s,n)}}var el=R("47Mwn");const ec=document.getElementById("recipe-steps"),ed=document.querySelector(".recipe-step-button"),eu=document.querySelector(".steps-preview ol"),eh=document.getElementById("recipe-tags"),ef=document.querySelector(".recipe-tag-button"),ep=document.querySelector(".tags-preview p"),em=document.getElementById("add-modal-reset-button"),eg=document.getElementById("show-modal-button"),eE=document.querySelector(".add-modal"),ey=document.getElementById("submit-recipe"),eC=document.getElementById("home-button"),ev=document.getElementById("favourite-button"),eO=document.getElementById("signOutBttn"),eI=document.querySelector(".recipe-list"),e_=document.getElementById("chat-history"),eb=document.getElementById("chat-input"),eT=document.getElementById("send-btn"),ew=document.getElementById("close-chat-btn"),eS=document.querySelector(".chatbot-buttons"),eR=document.getElementById("chatbot-container"),eA=document.getElementById("chat-input-label");let eN=[],eM=[];async function ex(){eL(await (0,el.loadRecipes)())}function eL(e){eI.innerHTML="",e.forEach(e=>{let t=document.createElement("div");t.classList.add("recipe-card"),t.innerHTML=`
          <h2>${e.title} ${e.favourite?"❤️":""}</h2>
          <p>${e.description}</p>
          <h3 class="recipe-list-h4">Steps:</h3>
          <ol class="ordered-list">
            ${e.steps.map((e,t)=>`<li>${t+1}. ${e}</li>`).join("")}
          </ol>
          <h4>Tags</h4>
          <p class="recipe-tags">${e.tags.join(", ")}</p>
          <div class="recipe-buttons">
            <button class="button recipe-button edit-btn">Edit</button>
            <button class="button recipe-button delete-btn">Delete</button>
          </div>
        `;let n=t.querySelector(".edit-btn"),s=t.querySelector(".delete-btn");n.addEventListener("click",()=>{document.getElementById("recipe-title").value=e.title,document.getElementById("recipe-description").value=e.description,document.getElementById("recipe-favourite").checked=e.favourite;let t=[...e.steps],n=[...e.tags];eu.innerHTML=t.map(e=>`<li>${e}</li>`).join(""),ep.textContent=n.join(", "),eE.style.display="flex",eg.style.backgroundColor="#f49cbb"}),s.addEventListener("click",async()=>{await (0,el.deleteRecipe)(e.id),ex()}),eI.appendChild(t)})}async function eD(){e=new er(await (0,el.getApiKey)()).getGenerativeModel({model:"gemini-1.5-flash"})}async function ek(t){try{let n=await e.generateContent(t),s=n.candidates[0]?.content.parts[0]?.text||"AI Error: No response.";eB(s)}catch(e){eB("AI Error: Unable to process request."),console.error(e)}}function eB(e){let t=document.createElement("div");t.textContent=e,t.className="history",e_.appendChild(t),eb.value=""}async function eH(e,t){let n={title:e,description:t,steps:[],tags:[],favourite:!1,createdAt:new Date().toISOString()};await (0,el.addRecipe)(n),ex()}async function e$(e){let t=!1;for(let n of(await (0,el.loadRecipes)()))if(n.title.toLowerCase()===e.toLowerCase()){await (0,el.deleteRecipe)(n.id),t=!0;break}t?(eB(`Recipe "${e}" deleted.`),ex()):eB(`Recipe "${e}" not found.`)}JSON.parse(localStorage.getItem("email"))||(window.location.href="index.html"),eO.addEventListener("click",function(){localStorage.removeItem("email"),window.location.href="index.html"}),document.addEventListener("DOMContentLoaded",async()=>{(0,el.loadRecipes)(),await ex(),await eD(),eT.addEventListener("click",async()=>{let e=eb.value.trim().toLowerCase();e?!function(e){if(e.startsWith("add recipe")){let t=e.replace("add recipe","").trim().split(";");if(t.length<2)return eB("Please specify a title and description using ';'. Example: 'add recipe Pancakes; A delicious breakfast.'"),!0;let n=t[0].trim(),s=t[1].trim();return n&&s?(eH(n,s),eB(`Recipe "${n}" added successfully!`)):eB("Invalid recipe format. Please provide both a title and description."),!0}if(e.startsWith("delete recipe")){let t=e.replace("delete recipe","").trim();return t?confirm(`Are you sure you want to delete "${t}"?`)&&e$(t):eB("Please specify the recipe title to delete."),!0}return!1}(e)&&ek(e):eB("Please enter a prompt")}),ed.addEventListener("click",()=>{let e=ec.value.trim();if(""!==e){eM.push(e);let t=document.createElement("li");t.textContent=e,eu.appendChild(t),ec.value=""}}),ef.addEventListener("click",()=>{let e=eh.value.trim();""!==e&&(eN.includes(e)||eN.push(e),ep.textContent="Tags: "+eN.join(", "),eh.value="")}),em.addEventListener("click",()=>{document.querySelectorAll(".recipe-input").forEach(e=>e.value=""),document.getElementById("recipe-favourite").checked=!1,eu.innerHTML="",eN.length=0,ep.textContent=""}),ey.addEventListener("click",async()=>{let e=document.getElementById("recipe-title").value.trim(),t=document.getElementById("recipe-description").value.trim(),n=document.getElementById("recipe-favourite").checked;if(e&&t){let s={title:e,description:t,steps:[...eM],tags:[...eN],favourite:n,createdAt:new Date().toISOString()};await (0,el.addRecipe)(s),em.click(),eE.style.display="none",eg.style.backgroundColor="#f4f4f4",eN=[],eM=[]}ex()}),eg.addEventListener("click",()=>{"none"===eE.style.display||""===eE.style.display?(eE.style.display="flex",eg.style.backgroundColor="#f49cbb"):(eE.style.display="none",eg.style.backgroundColor="#f4f4f4")}),eC.addEventListener("click",()=>{eE.style.display="none",eg.style.backgroundColor="#f4f4f4",ex()}),ev.addEventListener("click",async()=>{eL((await (0,el.loadRecipes)()).filter(e=>e.favourite))}),ev.addEventListener("keydown",e=>{if("Enter"===e.key){let e=document.activeElement;"checkbox"===e.type&&(e.checked=!e.checked)}}),e_.style.display="none",eb.style.display="none",eA.style.display="none",eT.style.display="none",ew.innerText="AI Chat",eS.style.justifyContent="center",eR.style.width="auto";let e=!1;ew.addEventListener("click",()=>{let t="none"===e_.style.display;eR.style.width=t?"300px":"auto",e_.style.display=t?"block":"none",eA.style.display=t?"block":"none",eb.style.display=t?"block":"none",eT.style.display=t?"block":"none",ew.innerText=t?"Close":"AI Chat",eS.style.justifyContent=t?"space-between":"center",t&&!e&&(eB('Welcome to the AI Chat! Available commands:\n<br/>- add recipe Title; Description"** → Add a recipe.\n<br/>- delete recipe Title"** → Remove a recipe.'),e=!0)}),await ex()});
//# sourceMappingURL=recipes.954d81d0.js.map

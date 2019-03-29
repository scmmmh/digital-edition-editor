(function(C,e){"object"==typeof exports&&"undefined"!=typeof module?e():"function"==typeof define&&define.amd?define(e):e()})(0,function(){"use strict"
function C(C="unreachable"){return new Error(C)}let e=0
function t(){return Object.create(null)}const H=Object.freeze([]),i=1
class V{validate(C){return this.value()===C}}V.id=0
const n=[],r=[]
class L{constructor(C,e){this.type=C,this.inner=e}value(){return(0,n[this.type])(this.inner)}validate(C){return(0,r[this.type])(this.inner,C)}}function o(C){let e=n.length
n.push(C=>C.value()),r.push((C,e)=>C.validate(e)),C.id=e}n.push(()=>0),r.push((C,e)=>0===e)
const s=new L(0,null)
n.push(()=>NaN),r.push((C,e)=>NaN===e)
const a=new L(1,null)
n.push(()=>c),r.push((C,e)=>e===c)
const M=new L(2,null)
function l({tag:C}){return C===s}function d(C){return C===s}let c=i
class u extends V{static create(C=c){return new L(this.id,new u(C))}constructor(C=c){super(),this.revision=C}value(){return this.revision}dirty(){this.revision=++c}}function h(C){let e=[]
for(let t=0,H=C.length;t<H;t++){let H=C[t].tag
if(H===a)return a
H!==s&&e.push(H)}return f(e)}function p(C){let e=[],t=C.head()
for(;null!==t;){let H=t.tag
if(H===a)return a
H!==s&&e.push(H),t=C.nextNode(t)}return f(e)}function m(C){let e=[]
for(let t=0,H=C.length;t<H;t++){let H=C[t]
if(H===a)return a
H!==s&&e.push(H)}return f(e)}function f(C){switch(C.length){case 0:return s
case 1:return C[0]
case 2:return Z.create(C[0],C[1])
default:return v.create(C)}}o(u)
class g extends V{constructor(){super(...arguments),this.lastChecked=null,this.lastValue=null}value(){let C=this.lastChecked,e=this.lastValue
return C!==c&&(this.lastChecked=c,this.lastValue=e=this.compute()),this.lastValue}invalidate(){this.lastChecked=null}}class Z extends g{static create(C,e){return new L(this.id,new Z(C,e))}constructor(C,e){super(),this.first=C,this.second=e}compute(){return Math.max(this.first.value(),this.second.value())}}o(Z)
class v extends g{static create(C){return new L(this.id,new v(C))}constructor(C){super(),this.tags=C}compute(){let C=this.tags,e=-1
for(let t=0;t<C.length;t++){let H=C[t].value()
e=Math.max(H,e)}return e}}o(v)
class y extends g{static create(C){return new L(this.id,new y(C))}constructor(C){super(),this.tag=C,this.lastUpdated=i}compute(){return Math.max(this.lastUpdated,this.tag.value())}update(C){C!==this.tag&&(this.tag=C,this.lastUpdated=c,this.invalidate())}}o(y)
class b{constructor(){this.lastRevision=null,this.lastValue=null}value(){let C=this.tag,e=this.lastRevision,t=this.lastValue
return null!==e&&C.validate(e)||(t=this.lastValue=this.compute(),this.lastRevision=C.value()),t}invalidate(){this.lastRevision=null}}class k{constructor(C){this.lastValue=null,this.lastRevision=null,this.initialized=!1,this.tag=C.tag,this.reference=C}peek(){return this.initialized?this.lastValue:this.initialize()}revalidate(){if(!this.initialized)return this.initialize()
let C=this.reference,e=this.lastRevision,t=C.tag
if(t.validate(e))return w
this.lastRevision=t.value()
let H=this.lastValue,i=C.value()
return i===H?w:(this.lastValue=i,i)}initialize(){let C=this.reference,e=this.lastValue=C.value()
return this.lastRevision=C.tag.value(),this.initialized=!0,e}}const w="adb3b78e-3d22-4e4b-877a-6317c2c5c145"
function S(C){return C!==w}class O{constructor(C){this.inner=C,this.tag=s}value(){return this.inner}}class x{constructor(C){this.next=null,this.prev=null,this.value=C}}class A{constructor(){this.clear()}head(){return this._head}tail(){return this._tail}clear(){this._head=this._tail=null}toArray(){let C=[]
return this.forEachNode(e=>C.push(e)),C}nextNode(C){return C.next}forEachNode(C){let e=this._head
for(;null!==e;)C(e),e=e.next}insertBefore(C,e=null){return null===e?this.append(C):(e.prev?e.prev.next=C:this._head=C,C.prev=e.prev,C.next=e,e.prev=C,C)}append(C){let e=this._tail
return e?(e.next=C,C.prev=e,C.next=null):this._head=C,this._tail=C}remove(C){return C.prev?C.prev.next=C.next:this._head=C.next,C.next?C.next.prev=C.prev:this._tail=C.prev,C}}Object.freeze([])
class T extends x{constructor(C,e){super(C.valueReferenceFor(e)),this.retained=!1,this.seen=!1,this.key=e.key,this.iterable=C,this.memo=C.memoReferenceFor(e)}update(C){this.retained=!0,this.iterable.updateValueReference(this.value,C),this.iterable.updateMemoReference(this.memo,C)}shouldRemove(){return!this.retained}reset(){this.retained=!1,this.seen=!1}}class B{constructor(C){this.iterator=null,this.map=Object.create(null),this.list=new A,this.tag=C.tag,this.iterable=C}isEmpty(){return(this.iterator=this.iterable.iterate()).isEmpty()}iterate(){let C
return C=null===this.iterator?this.iterable.iterate():this.iterator,this.iterator=null,C}has(C){return!!this.map[C]}get(C){return this.map[C]}wasSeen(C){let e=this.map[C]
return void 0!==e&&e.seen}append(C){let e=this.map,t=this.list,H=this.iterable,i=e[C.key]=new T(H,C)
return t.append(i),i}insertBefore(C,e){let t=this.map,H=this.list,i=this.iterable,V=t[C.key]=new T(i,C)
return V.retained=!0,H.insertBefore(V,e),V}move(C,e){let t=this.list
C.retained=!0,t.remove(C),t.insertBefore(C,e)}remove(C){this.list.remove(C),delete this.map[C.key]}nextNode(C){return this.list.nextNode(C)}head(){return this.list.head()}}class E{constructor(C){this.iterator=null
let e=new B(C)
this.artifacts=e}next(){let C=this.artifacts,e=(this.iterator=this.iterator||C.iterate()).next()
return null===e?null:C.append(e)}}var D;(function(C){C[C.Append=0]="Append",C[C.Prune=1]="Prune",C[C.Done=2]="Done"})(D||(D={}))
class N{constructor({target:C,artifacts:e}){this.target=C,this.artifacts=e,this.iterator=e.iterate(),this.current=e.head()}sync(){let C=D.Append
for(;;)switch(C){case D.Append:C=this.nextAppend()
break
case D.Prune:C=this.nextPrune()
break
case D.Done:return void this.nextDone()}}advanceToKey(C){let e=this.current,t=this.artifacts,H=e
for(;null!==H&&H.key!==C;)H.seen=!0,H=t.nextNode(H)
null!==H&&(this.current=t.nextNode(H))}nextAppend(){let C=this.iterator,e=this.current,t=this.artifacts,H=C.next()
if(null===H)return this.startPrune()
let i=H.key
return null!==e&&e.key===i?this.nextRetain(H):t.has(i)?this.nextMove(H):this.nextInsert(H),D.Append}nextRetain(C){let e=this.artifacts,t=this.current;(t=t).update(C),this.current=e.nextNode(t),this.target.retain(C.key,t.value,t.memo)}nextMove(C){let e=this.current,t=this.artifacts,H=this.target,i=C.key,V=t.get(C.key)
V.update(C),t.wasSeen(C.key)?(t.move(V,e),H.move(V.key,V.value,V.memo,e?e.key:null)):this.advanceToKey(i)}nextInsert(C){let e=this.artifacts,t=this.target,H=this.current,i=e.insertBefore(C,H)
t.insert(i.key,i.value,i.memo,H?H.key:null)}startPrune(){return this.current=this.artifacts.head(),D.Prune}nextPrune(){let C=this.artifacts,e=this.target,t=this.current
if(null===t)return D.Done
let H=t
return this.current=C.nextNode(H),H.shouldRemove()?(C.remove(H),e.delete(H.key)):H.reset(),D.Prune}nextDone(){this.target.done()}}class P{constructor(){this.tags=new Set}add(C){this.tags.add(C)}combine(){let C=this.tags
return 0===C.size?s:m([...C])}}function R(...C){let e=C[0],t=C[1],H=C[2]
if(H)return function(C,e,t){let H=W(C)
H.trackedProperties[e]=!0,H.trackedComputedProperties[e]=!0
let i=t.get,V=t.set
return{enumerable:!0,configurable:!1,get:function(){let C=F,t=F=new P,H=i.call(this)
F=C
let V=t.combine()
F&&F.add(V)
return W(this).updatableTagFor(e).inner.update(V),H},set:V?function(){U.inner.dirty(),W(this).updatableTagFor(e).inner.update(u.create()),V.apply(this,arguments)}:void 0}}(e,t,H);(function(C,e){let t=Symbol(e)
W(C).trackedProperties[e]=!0,Object.defineProperty(C,e,{configurable:!0,get(){return I(this,e),this[t]},set(C){U.inner.dirty(),W(this).updatableTagFor(e).inner.update(u.create()),this[t]=C,G()}})})(e,t)}let F=null
function I(C,e){F&&F.add(W(C).updatableTagFor(e))}class _{constructor(C){this.tags=t(),this.computedPropertyTags=t(),this.trackedProperties=C?Object.create(C.trackedProperties):t(),this.trackedComputedProperties=C?Object.create(C.trackedComputedProperties):t()}tagFor(C){let e=this.tags[C]
return e||(this.trackedComputedProperties[C]?this.tags[C]=this.updatableTagFor(C):this.tags[C]=u.create())}updatableTagFor(C){let e
return this.trackedComputedProperties[C]?(e=this.computedPropertyTags[C])||(this.computedPropertyTags[C]=y.create(s)):(e=this.tags[C])||(this.tags[C]=y.create(s))}}const z=new WeakMap
function W(C){let e=z.get(C)
if(e)return e
let t=function(C){let e=null,t=C
for(;!e;){if(!(t=j(t)))return e
e=z.get(t)}return e}(C)
return e=new _(t),z.set(C,e),e}const j=Object.getPrototypeOf
const U=u.create()
let G=function(){}
class $ extends Error{constructor(C,e,t){super(t),this.target=C,this.key=e}static for(C,e){return new $(C,e,`The property '${e}' on ${C} was changed after being rendered. If you want to change a property used in a template after the component has rendered, mark the property as a tracked property with the @tracked decorator.`)}}function q(C,e,t=function(C,e){throw $.for(C,e)}){if("object"==typeof C&&C){return W(C).tagFor(e)}return s}class K{constructor(C){this.debugName=null,this.__args__=null,Object.assign(this,C)}get element(){let C=this.bounds
return function(C,e){if(!C)throw new Error(e||"assertion failure")}(C&&C.firstNode===C.lastNode,"The 'element' property can only be accessed on components that contain a single root element in their template. Try using 'bounds' instead to access the first and last nodes."),C.firstNode}get args(){return I(this,"args"),this.__args__}set args(C){this.__args__=C,W(this).updatableTagFor("args").inner.update(M)}static create(C){return new this(C)}didInsertElement(){}didUpdate(){}willDestroy(){}destroy(){this.willDestroy()}toString(){return`${this.debugName} component`}}const J={attributeHook:!0,createArgs:!0,createCaller:!1,createInstance:!0,dynamicLayout:!1,dynamicScope:!1,dynamicTag:!0,elementHook:!0,prepareArgs:!1,updateHook:!0}
class Y{constructor(C,e,t,H){this.name=C,this.manager=e,this.ComponentClass=t,this.handle=H,this.state={name:C,capabilities:J,ComponentClass:t,handle:H}}toJSON(){return{GlimmerDebug:`<component-definition name="${this.name}">`}}}class X{constructor(C){this._bounds=C}get firstNode(){return this._bounds.firstNode()}get lastNode(){return this._bounds.lastNode()}}const Q=new class{constructor(){this.evaluateOpcode=function(C){let e=new Array(C)
for(let t=0;t<C;t++)e[t]=null
return e}(98).slice()}add(C,e,t="syscall"){this.evaluateOpcode[C]={syscall:"syscall"===t,evaluate:e}}debugBefore(C,e,t){return{sp:void 0,state:void 0}}debugAfter(C,e,t,H){H.sp,H.state}evaluate(C,e,t){let H=this.evaluateOpcode[t]
H.syscall?H.evaluate(C,e):H.evaluate(C.inner,e)}}
class CC{constructor(){this._guid=++e}}class eC extends CC{constructor(){super(...arguments),this.next=null,this.prev=null}}var tC;(function(C){C[C.pc=0]="pc",C[C.ra=1]="ra",C[C.fp=2]="fp",C[C.sp=3]="sp",C[C.s0=4]="s0",C[C.s1=5]="s1",C[C.t0=6]="t0",C[C.t1=7]="t1",C[C.v0=8]="v0"})(tC||(tC={}))
class HC extends O{constructor(C){super(C)}static create(C){return void 0===C?nC:null===C?rC:!0===C?LC:!1===C?oC:"number"==typeof C?new VC(C):new iC(C)}get(C){return nC}}class iC extends HC{constructor(){super(...arguments),this.lengthReference=null}get(C){if("length"===C){let C=this.lengthReference
return null===C&&(C=this.lengthReference=new VC(this.inner.length)),C}return super.get(C)}}class VC extends HC{constructor(C){super(C)}}const nC=new VC(void 0),rC=new VC(null),LC=new VC(!0),oC=new VC(!1)
class sC{constructor(C){this.inner=C,this.tag=C.tag}value(){return this.toBool(this.inner.value())}toBool(C){return!!C}}class aC extends b{constructor(C){super(),this.parts=C,this.tag=h(C)}compute(){let C=new Array
for(let e=0;e<this.parts.length;e++){let t=this.parts[e].value()
null!=t&&(C[e]=MC(t))}return C.length>0?C.join(""):null}}function MC(C){return"function"!=typeof C.toString?"":String(C)}Q.add(1,(C,{op1:e})=>{let t=C.stack,H=C.constants.resolveHandle(e)(C,t.pop())
C.loadValue(tC.v0,H)}),Q.add(6,(C,{op1:e})=>{let t=C.referenceForSymbol(e)
C.stack.push(t)}),Q.add(4,(C,{op1:e})=>{let t=C.stack.pop()
C.scope().bindSymbol(e,t)}),Q.add(5,(C,{op1:e})=>{let t=C.stack.pop(),H=C.stack.pop(),i=C.stack.pop(),V=i?[t,H,i]:null
C.scope().bindBlock(e,V)}),Q.add(96,(C,{op1:e})=>{let t=C.constants.getString(e),H=C.scope().getPartialMap()[t]
void 0===H&&(H=C.getSelf().get(t)),C.stack.push(H)}),Q.add(20,(C,{op1:e,op2:t})=>{C.pushRootScope(e,!!t)}),Q.add(7,(C,{op1:e})=>{let t=C.constants.getString(e),H=C.stack.pop()
C.stack.push(H.get(t))}),Q.add(8,(C,{op1:e})=>{let t=C.stack,H=C.scope().getBlock(e)
H?(t.push(H[2]),t.push(H[1]),t.push(H[0])):(t.push(null),t.push(null),t.push(null))}),Q.add(9,(C,{op1:e})=>{let t=!!C.scope().getBlock(e)
C.stack.push(t?LC:oC)}),Q.add(10,C=>{C.stack.pop(),C.stack.pop()
let e=C.stack.pop(),t=e&&e.parameters.length
C.stack.push(t?LC:oC)}),Q.add(11,(C,{op1:e})=>{let t=new Array(e)
for(let H=e;H>0;H--){t[H-1]=C.stack.pop()}C.stack.push(new aC(t))})
const lC="CURRIED COMPONENT DEFINITION [id=6f00feb9-a0ef-4547-99ea-ac328f80acea]"
function dC(C){return!(!C||!C[lC])}class cC{constructor(C,e){this.inner=C,this.args=e,this[lC]=!0}unwrap(C){C.realloc(this.offset)
let e=this
for(;;){var t=e
let H=t.args,i=t.inner
if(H&&(C.positional.prepend(H.positional),C.named.merge(H.named)),!dC(i))return i
e=i}}get offset(){let C=this.inner,e=this.args,t=e?e.positional.length:0
return dC(C)?t+C.offset:t}}function uC(C){return hC(C)?"":String(C)}function hC(C){return null==C||"function"!=typeof C.toString}function pC(C){return"object"==typeof C&&null!==C&&"number"==typeof C.nodeType}function mC(C){return"string"==typeof C}class fC extends eC{constructor(C,e,t){super(),this.node=C,this.reference=e,this.lastValue=t,this.type="dynamic-text",this.tag=e.tag,this.lastRevision=this.tag.value()}evaluate(){let C=this.reference,e=this.tag
e.validate(this.lastRevision)||(this.lastRevision=e.value(),this.update(C.value()))}update(C){let e,t=this.lastValue
if(C!==t&&(e=hC(C)?"":mC(C)?C:String(C))!==t){this.node.nodeValue=this.lastValue=e}}}class gC extends sC{static create(C){return new gC(C)}toBool(C){return dC(C)}}class ZC{constructor(C){this.inner=C,this.tag=C.tag}value(){let C=this.inner.value()
return function(C){return mC(C)||hC(C)||"boolean"==typeof C||"number"==typeof C}(C)?1:(e=C)&&e[lC]?0:function(C){return"object"==typeof C&&null!==C&&"function"==typeof C.toHTML}(C)?3:function(C){return pC(C)&&11===C.nodeType}(C)?4:pC(C)?5:1
var e}}Q.add(28,C=>{let e=C.stack.pop().value(),t=hC(e)?"":String(e)
C.elements().appendDynamicHTML(t)}),Q.add(29,C=>{let e=C.stack.pop().value().toHTML(),t=hC(e)?"":e
C.elements().appendDynamicHTML(t)}),Q.add(32,C=>{let e=C.stack.pop(),t=e.value(),H=hC(t)?"":String(t),i=C.elements().appendDynamicText(H)
l(e)||C.updateWith(new fC(i,e,H))}),Q.add(30,C=>{let e=C.stack.pop().value()
C.elements().appendDynamicFragment(e)}),Q.add(31,C=>{let e=C.stack.pop().value()
C.elements().appendDynamicNode(e)}),Q.add(22,C=>C.pushChildScope()),Q.add(23,C=>C.popScope()),Q.add(44,C=>C.pushDynamicScope()),Q.add(45,C=>C.popDynamicScope()),Q.add(12,(C,{op1:e})=>{C.stack.push(C.constants.getOther(e))}),Q.add(13,(C,{op1:e})=>{let t=C.stack,H=e>>3
switch(7&e){case 0:t.push(H)
break
case 1:t.push(C.constants.getNumber(H))
break
case 2:t.push(C.constants.getString(H))
break
case 3:t.pushEncodedImmediate(e)
break
case 4:case 5:t.push(C.constants.getNumber(H))}}),Q.add(14,C=>{let e=C.stack
e.push(HC.create(e.pop()))}),Q.add(15,C=>{let e=C.stack
e.push(e.peek().value())}),Q.add(16,(C,{op1:e,op2:t})=>{let H=C.fetchValue(e)-t
C.stack.dup(H)}),Q.add(17,(C,{op1:e})=>{C.stack.pop(e)}),Q.add(18,(C,{op1:e})=>{C.load(e)}),Q.add(19,(C,{op1:e})=>{C.fetch(e)}),Q.add(43,(C,{op1:e})=>{let t=C.constants.getArray(e)
C.bindDynamicScope(t)}),Q.add(61,(C,{op1:e})=>{C.enter(e)}),Q.add(62,C=>{C.exit()}),Q.add(48,(C,{op1:e})=>{C.stack.push(C.constants.getSerializable(e))}),Q.add(47,C=>{C.stack.push(C.scope())}),Q.add(46,C=>{let e=C.stack,t=e.pop()
t?e.pushSmi(t.compile()):e.pushNull()}),Q.add(51,C=>{let e=C.stack,t=e.pop(),H=e.pop(),i=e.pop(),V=e.pop()
if(null===i)return C.pushFrame(),void C.pushScope(H)
let n=H
{let C=i.parameters,e=C.length
if(e>0){n=n.child()
for(let t=0;t<e;t++)n.bindSymbol(C[t],V.at(t))}}C.pushFrame(),C.pushScope(n),C.call(t)}),Q.add(53,(C,{op1:e})=>{let t=C.stack.pop()
if(l(t))t.value()&&C.goto(e)
else{let H=new k(t)
H.peek()&&C.goto(e),C.updateWith(new vC(H))}}),Q.add(54,(C,{op1:e})=>{let t=C.stack.pop()
if(l(t))t.value()||C.goto(e)
else{let H=new k(t)
H.peek()||C.goto(e),C.updateWith(new vC(H))}}),Q.add(55,(C,{op1:e,op2:t})=>{C.stack.peek()===t&&C.goto(e)}),Q.add(56,C=>{let e=C.stack.peek()
l(e)||C.updateWith(vC.initialize(new k(e)))}),Q.add(63,C=>{let e=C.env,t=C.stack
t.push(e.toConditionalReference(t.pop()))})
class vC extends eC{constructor(C){super(),this.type="assert",this.tag=C.tag,this.cache=C}static initialize(C){let e=new vC(C)
return C.peek(),e}evaluate(C){S(this.cache.revalidate())&&C.throw()}}Q.add(26,(C,{op1:e})=>{C.elements().appendText(C.constants.getString(e))}),Q.add(27,(C,{op1:e})=>{C.elements().appendComment(C.constants.getString(e))}),Q.add(33,(C,{op1:e})=>{C.elements().openElement(C.constants.getString(e))}),Q.add(34,C=>{let e=C.stack.pop().value()
C.elements().openElement(e)}),Q.add(41,C=>{let e,t,H=C.stack.pop(),i=C.stack.pop(),V=C.stack.pop().value()
if(l(H))e=H.value()
else{let t=new k(H)
e=t.peek(),C.updateWith(new vC(t))}if(l(i))t=i.value()
else{let e=new k(i)
t=e.peek(),C.updateWith(new vC(e))}C.elements().pushRemoteElement(e,V,t)}),Q.add(42,C=>{C.elements().popRemoteElement()}),Q.add(38,C=>{let e=C.fetchValue(tC.t0)
e&&(e.flush(C),C.loadValue(tC.t0,null)),C.elements().flushElement()}),Q.add(39,C=>{C.elements().closeElement()}),Q.add(40,(C,{op1:e})=>{let t=C.constants.resolveHandle(e),H=C.stack.pop()
var i=C.elements()
let V=i.constructing,n=i.updateOperations,r=C.dynamicScope(),L=t.create(V,H,r,n)
C.env.scheduleInstallModifier(L,t)
let o=t.getDestructor(L)
o&&C.newDestroyable(o)
let s=t.getTag(L)
d(s)||C.updateWith(new yC(s,t,L))})
class yC extends eC{constructor(C,e,t){super(),this.tag=C,this.manager=e,this.modifier=t,this.type="update-modifier",this.lastUpdated=C.value()}evaluate(C){let e=this.manager,t=this.modifier,H=this.tag,i=this.lastUpdated
H.validate(i)||(C.env.scheduleUpdateModifier(t,e),this.lastUpdated=H.value())}}Q.add(35,(C,{op1:e,op2:t,op3:H})=>{let i=C.constants.getString(e),V=C.constants.getString(t),n=H?C.constants.getString(H):null
C.elements().setStaticAttribute(i,V,n)}),Q.add(36,(C,{op1:e,op2:t,op3:H})=>{let i=C.constants.getString(e),V=C.stack.pop(),n=V.value(),r=H?C.constants.getString(H):null,L=C.elements().setDynamicAttribute(i,n,!!t,r)
l(V)||C.updateWith(new bC(V,L))})
class bC extends eC{constructor(C,e){super(),this.reference=C,this.attribute=e,this.type="patch-element",this.tag=C.tag,this.lastRevision=this.tag.value()}evaluate(C){let e=this.attribute,t=this.reference,H=this.tag
H.validate(this.lastRevision)||(this.lastRevision=H.value(),e.update(t.value(),C.env))}}function kC(C,e,t){return C.lookupComponentDefinition(e,t)}class wC{constructor(C,e,t,H){this.inner=C,this.resolver=e,this.meta=t,this.args=H,this.tag=C.tag,this.lastValue=null,this.lastDefinition=null}value(){let C=this.inner,e=this.lastValue,t=C.value()
if(t===e)return this.lastDefinition
let H=null
if(dC(t))H=t
else if("string"==typeof t&&t){H=kC(this.resolver,t,this.meta)}return H=this.curry(H),this.lastValue=t,this.lastDefinition=H,H}get(){return nC}curry(C){let e=this.args
return!e&&dC(C)?C:C?new cC(C,e):null}}class SC{constructor(C){this.list=C,this.tag=h(C),this.list=C}value(){let C=[],e=this.list
for(let t=0;t<e.length;t++){let H=uC(e[t].value())
H&&C.push(H)}return 0===C.length?null:C.join(" ")}}function OC(C){return 0|(C.dynamicLayout?1:0)|(C.dynamicTag?2:0)|(C.prepareArgs?4:0)|(C.createArgs?8:0)|(C.attributeHook?16:0)|(C.elementHook?32:0)|(C.dynamicScope?64:0)|(C.createCaller?128:0)|(C.updateHook?256:0)|(C.createInstance?512:0)}function xC(C,e){return!!(C&e)}Q.add(69,C=>{let e=C.stack,t=e.pop()
e.push(gC.create(t))}),Q.add(70,C=>{let e=C.stack,t=e.peek()
e.push(new ZC(t))}),Q.add(71,(C,{op1:e})=>{let t=C.stack,H=t.pop(),i=t.pop(),V=C.constants.getSerializable(e),n=C.constants.resolver
C.loadValue(tC.v0,new wC(H,n,V,i))}),Q.add(72,(C,{op1:e})=>{let t=C.constants.resolveHandle(e),H=t.manager,i=OC(H.getCapabilities(t.state)),V={definition:t,manager:H,capabilities:i,state:null,handle:null,table:null,lookup:null}
C.stack.push(V)}),Q.add(75,(e,{op1:t})=>{let H,i=e.stack,V=i.pop().value(),n=e.constants.getSerializable(t)
if(e.loadValue(tC.t1,null),"string"==typeof V){H=kC(e.constants.resolver,V,n)}else{if(!dC(V))throw C()
H=V}i.push(H)}),Q.add(73,C=>{let e,t,H=C.stack,i=H.pop()
dC(i)?t=e=null:e=OC((t=i.manager).getCapabilities(i.state)),H.push({definition:i,capabilities:e,manager:t,state:null,handle:null,table:null})}),Q.add(74,(e,{op1:t})=>{let H,i=e.stack,V=i.pop().value()
if(!dC(V))throw C()
H=V,i.push(H)}),Q.add(76,(C,{op1:e,op2:t})=>{let H=C.stack,i=C.constants.getStringArray(e),V=t>>4,n=8&t,r=[]
4&t&&r.push("main"),2&t&&r.push("else"),1&t&&r.push("attrs"),C.args.setup(H,i,r,V,!!n),H.push(C.args)}),Q.add(77,C=>{let e=C.stack
e.push(C.args.empty(e))}),Q.add(80,C=>{let e=C.stack,t=e.pop().capture()
e.push(t)}),Q.add(79,(C,{op1:e})=>{let t=C.stack,H=C.fetchValue(e),i=t.pop(),V=H.definition
dC(V)&&(V=function(C,e,t){let H=C.definition=e.unwrap(t),i=H.manager,V=H.state
return C.manager=i,C.capabilities=OC(i.getCapabilities(V)),H}(H,V,i))
var n=V
let r=n.manager,L=n.state
if(!0!==xC(H.capabilities,4))return void t.push(i)
let o=i.blocks.values,s=i.blocks.names,a=r.prepareArgs(L,i)
if(a){i.clear()
for(let i=0;i<o.length;i++)t.push(o[i])
let C=a.positional,e=a.named,H=C.length
for(let i=0;i<H;i++)t.push(C[i])
let V=Object.keys(e)
for(let i=0;i<V.length;i++)t.push(e[V[i]])
i.setup(t,V,s,H,!0)}t.push(i)}),Q.add(81,(C,{op1:e,op2:t})=>{let H=C.fetchValue(t),i=H.definition,V=H.manager,n=H.capabilities=OC(V.getCapabilities(i.state)),r=null
xC(n,64)&&(r=C.dynamicScope())
let L=1&e,o=null
xC(n,8)&&(o=C.stack.peek())
let s=null
xC(n,128)&&(s=C.getSelf())
let a=V.create(C.env,i.state,o,r,s,!!L)
H.state=a
let M=V.getTag(a)
xC(n,256)&&!d(M)&&C.updateWith(new BC(M,a,V,r))}),Q.add(82,(C,{op1:e})=>{var t=C.fetchValue(e)
let H=t.manager,i=t.state,V=H.getDestructor(i)
V&&C.newDestroyable(V)}),Q.add(91,C=>{C.beginCacheGroup(),C.elements().pushSimpleBlock()}),Q.add(83,C=>{C.loadValue(tC.t0,new AC)}),Q.add(37,(C,{op1:e,op2:t,op3:H})=>{let i=C.constants.getString(e),V=C.stack.pop(),n=H?C.constants.getString(H):null
C.fetchValue(tC.t0).setAttribute(i,V,!!t,n)})
class AC{constructor(){this.attributes=t(),this.classes=[]}setAttribute(C,e,t,H){let i={value:e,namespace:H,trusting:t}
"class"===C&&this.classes.push(e),this.attributes[C]=i}flush(C){for(let e in this.attributes){let t=this.attributes[e],H=t.value,i=t.namespace,V=t.trusting
if("class"===e&&(H=new SC(this.classes)),"type"===e)continue
let n=C.elements().setDynamicAttribute(e,H.value(),V,i)
l(H)||C.updateWith(new bC(H,n))}if("type"in this.attributes){let e=this.attributes.type,t=e.value,H=e.namespace,i=e.trusting,V=C.elements().setDynamicAttribute("type",t.value(),i,H)
l(t)||C.updateWith(new bC(t,V))}}}function TC(C,e,t,H,i){let V=t.table.symbols.indexOf(C),n=H.get(e);-1!==V&&i.scope().bindBlock(V+1,n),t.lookup&&(t.lookup[C]=n)}Q.add(93,(C,{op1:e})=>{var t=C.fetchValue(e)
let H=t.definition,i=t.state,V=H.manager,n=C.fetchValue(tC.t0)
V.didCreateElement(i,C.elements().expectConstructing("DidCreateElementOpcode#evaluate"),n)}),Q.add(84,(C,{op1:e})=>{var t=C.fetchValue(e)
let H=t.definition,i=t.state,V=H.manager
C.stack.push(V.getSelf(i))}),Q.add(85,(C,{op1:e})=>{var t=C.fetchValue(e)
let H=t.definition,i=t.state,V=H.manager
C.stack.push(V.getTagName(i))}),Q.add(86,(e,{op1:t})=>{let H,i=e.fetchValue(t),V=i.manager,n=i.definition,r=e.constants.resolver,L=e.stack,o=i.state,s=i.capabilities,a=n.state
if(function(C,e){return!1===xC(C,1)}(s))H=V.getLayout(a,r)
else{if(!function(C,e){return!0===xC(C,1)}(s))throw C()
H=V.getDynamicLayout(o,r)}L.push(H.symbolTable),L.push(H.handle)}),Q.add(68,(C,{op1:e})=>{let t=C.stack.pop(),H=C.stack.pop(),i=t.manager,V=OC(i.getCapabilities(t.state)),n={definition:t,manager:i,capabilities:V,state:null,handle:H.handle,table:H.symbolTable,lookup:null}
C.loadValue(e,n)}),Q.add(89,(C,{op1:e})=>{let t=C.stack,H=t.pop(),i=t.pop(),V=C.fetchValue(e)
V.handle=H,V.table=i}),Q.add(21,(C,{op1:e})=>{let t=C.fetchValue(e).table.symbols
C.pushRootScope(t.length+1,!0)}),Q.add(87,(C,{op1:e})=>{let H=C.fetchValue(e)
if(H.table.hasEval){let e=H.lookup=t()
C.scope().bindEvalScope(e)}}),Q.add(2,(C,{op1:e})=>{let t=C.fetchValue(e),H=C.scope(),i=C.stack.peek(),V=i.named.atNames
for(let n=V.length-1;n>=0;n--){let C=V[n],e=t.table.symbols.indexOf(V[n]),r=i.named.get(C,!1);-1!==e&&H.bindSymbol(e+1,r),t.lookup&&(t.lookup[C]=r)}}),Q.add(3,(C,{op1:e})=>{let t=C.fetchValue(e)
let H=C.stack.peek().blocks
TC("&attrs","attrs",t,H,C),TC("&inverse","else",t,H,C),TC("&default","main",t,H,C)}),Q.add(90,(C,{op1:e})=>{let t=C.fetchValue(e)
C.call(t.handle)}),Q.add(94,(C,{op1:e})=>{var t=C.fetchValue(e)
let H=t.manager,i=t.state,V=C.elements().popBlock()
H.didRenderLayout(i,V),C.env.didCreate(i,H),C.updateWith(new EC(H,i,V))}),Q.add(92,C=>{C.commitCacheGroup()})
class BC extends eC{constructor(C,e,t,H){super(),this.tag=C,this.component=e,this.manager=t,this.dynamicScope=H,this.type="update-component"}evaluate(C){let e=this.component,t=this.manager,H=this.dynamicScope
t.update(e,H)}}class EC extends eC{constructor(C,e,t){super(),this.manager=C,this.component=e,this.bounds=t,this.type="did-update-layout",this.tag=s}evaluate(C){let e=this.manager,t=this.component,H=this.bounds
e.didUpdateLayout(t,H),C.env.didUpdate(t,e)}}let DC=function(C,e){console.info("Use `context`, and `get(<path>)` to debug this template."),e("this")}
class NC{constructor(C,e,H){this.scope=C,this.locals=t()
for(let t=0;t<H.length;t++){let i=H[t],V=e[i-1],n=C.getSymbol(i)
this.locals[V]=n}}get(C){let e=this.scope,t=this.locals,H=C.split(".")
var i=C.split(".")
let V,n=i[0],r=i.slice(1),L=e.getEvalScope()
return"this"===n?V=e.getSelf():t[n]?V=t[n]:0===n.indexOf("@")&&L[n]?V=L[n]:(V=this.scope.getSelf(),r=H),r.reduce((C,e)=>C.get(e),V)}}Q.add(97,(C,{op1:e,op2:t})=>{let H=C.constants.getStringArray(e),i=C.constants.getArray(t),V=new NC(C.scope(),H,i)
DC(C.getSelf().value(),C=>V.get(C).value())}),Q.add(95,(C,{op1:e,op2:t,op3:H})=>{let i=C.constants,V=C.constants.resolver,n=C.stack.pop().value(),r=i.getSerializable(e),L=i.getStringArray(t),o=i.getArray(H),s=V.lookupPartial(n,r)
var a=V.resolve(s).getPartial()
let M=a.symbolTable,l=a.handle
{let e=M.symbols,t=C.scope(),H=C.pushRootScope(e.length,!1),i=t.getEvalScope()
H.bindCallerScope(t.getCallerScope()),H.bindEvalScope(i),H.bindSelf(t.getSelf())
let V=Object.create(t.getPartialMap())
for(let C=0;C<o.length;C++){let e=o[C],H=L[e-1],i=t.getSymbol(e)
V[H]=i}if(i)for(let C=0;C<e.length;C++){let t=C+1,V=i[e[C]]
void 0!==V&&H.bind(t,V)}H.bindPartialMap(V),C.pushFrame(),C.call(l)}})
class PC{constructor(C){this.tag=C.tag,this.artifacts=C}value(){return!this.artifacts.isEmpty()}}Q.add(66,C=>{let e=C.stack,t=e.pop(),H=e.pop(),i=C.env.iterableFor(t,H.value()),V=new E(i)
e.push(V),e.push(new PC(V.artifacts))}),Q.add(64,(C,{op1:e})=>{C.enterList(e)}),Q.add(65,C=>{C.exitList()}),Q.add(67,(C,{op1:e})=>{let t=C.stack.peek().next()
if(t){let e=C.iterate(t.memo,t.value)
C.enterItem(t.key,e)}else C.goto(e)})
class RC{constructor(C,e,t){this.parentNode=C,this.first=e,this.last=t}parentElement(){return this.parentNode}firstNode(){return this.first}lastNode(){return this.last}}const FC="http://www.w3.org/2000/svg"
function IC(C,e,t){if(!C)return e
if(!function(C,e){let t=C.createElementNS(e,"svg")
try{t.insertAdjacentHTML("beforeend","<circle></circle>")}catch(H){}finally{return 1!==t.childNodes.length||t.firstChild.namespaceURI!==FC}}(C,t))return e
let H=C.createElement("div")
return class extends e{insertHTMLBefore(C,e,i){return null===i||""===i?super.insertHTMLBefore(C,e,i):C.namespaceURI!==t?super.insertHTMLBefore(C,e,i):function(C,e,t,H){let i="<svg>"+t+"</svg>"
e.innerHTML=i
var V=function(C,e,t){let H=C.firstChild,i=null,V=H
for(;V;)i=V,V=V.nextSibling,e.insertBefore(i,t)
return[H,i]}(e.firstChild,C,H)
let n=V[0],r=V[1]
return new RC(C,n,r)}(C,H,i,e)}}}function _C(C,e){return C&&function(C){let e=C.createElement("div")
if(e.innerHTML="first",e.insertAdjacentHTML("beforeend","second"),2===e.childNodes.length)return!1
return!0}(C)?class extends e{constructor(C){super(C),this.uselessComment=C.createComment("")}insertHTMLBefore(C,e,t){if(null===t)return super.insertHTMLBefore(C,e,t)
let H=!1,i=e?e.previousSibling:C.lastChild
i&&i instanceof Text&&(H=!0,C.insertBefore(this.uselessComment,e))
let V=super.insertHTMLBefore(C,e,t)
return H&&C.removeChild(this.uselessComment),V}}:e}const zC="http://www.w3.org/2000/svg",WC={foreignObject:1,desc:1,title:1},jC=Object.create(null);["b","big","blockquote","body","br","center","code","dd","div","dl","dt","em","embed","h1","h2","h3","h4","h5","h6","head","hr","i","img","li","listing","main","meta","nobr","ol","p","pre","ruby","s","small","span","strong","strike","sub","sup","table","tt","u","ul","var"].forEach(C=>jC[C]=1)
let UC="undefined"==typeof document?null:document
class GC{constructor(C){this.document=C,this.setupUselessElement()}setupUselessElement(){this.uselessElement=this.document.createElement("div")}createElement(C,e){let t,H
if(e?(t=e.namespaceURI===zC||"svg"===C,H=WC[e.tagName]):(t="svg"===C,H=!1),t&&!H){if(jC[C])throw new Error(`Cannot create a ${C} inside an SVG context`)
return this.document.createElementNS(zC,C)}return this.document.createElement(C)}insertBefore(C,e,t){C.insertBefore(e,t)}insertHTMLBefore(C,e,t){return function(C,e,t,H){let i,V=e,n=t,r=n?n.previousSibling:V.lastChild
if(null===H||""===H)return new RC(V,null,null)
null===n?(V.insertAdjacentHTML("beforeend",H),i=V.lastChild):n instanceof HTMLElement?(n.insertAdjacentHTML("beforebegin",H),i=n.previousSibling):(V.insertBefore(C,n),C.insertAdjacentHTML("beforebegin",H),i=C.previousSibling,V.removeChild(C))
let L=r?r.nextSibling:V.firstChild
return new RC(V,L,i)}(this.uselessElement,C,e,t)}createTextNode(C){return this.document.createTextNode(C)}createComment(C){return this.document.createComment(C)}}var $C;(function(C){class e extends GC{createElementNS(C,e){return this.document.createElementNS(C,e)}setAttribute(C,e,t,H=null){H?C.setAttributeNS(H,e,t):C.setAttribute(e,t)}}C.TreeConstruction=e
let t=e
t=_C(UC,t),t=IC(UC,t,zC),C.DOMTreeConstruction=t})($C||($C={}))
let qC=class extends GC{constructor(C){super(C),this.document=C,this.namespace=null}setAttribute(C,e,t){C.setAttribute(e,t)}removeAttribute(C,e){C.removeAttribute(e)}insertAfter(C,e,t){this.insertBefore(C,e,t.nextSibling)}}
qC=_C(UC,qC),qC=IC(UC,qC,zC)
$C.DOMTreeConstruction
class KC{constructor(C,e,t=e.length){this.tag=C,this.references=e,this.length=t}static empty(){return new KC(s,H,0)}at(C){return this.references[C]}value(){return this.references.map(this.valueOf)}get(C){let e=this.references,t=this.length
if("length"===C)return HC.create(t)
{let H=parseInt(C,10)
return H<0||H>=t?nC:e[H]}}valueOf(C){return C.value()}}new class{constructor(C,e,t){this.tag=C,this.names=e,this.references=t,this.length=e.length,this._map=null}get map(){let C=this._map
if(!C){let e=this.names,H=this.references
C=this._map=t()
for(let t=0;t<e.length;t++)C[e[t]]=H[t]}return C}has(C){return-1!==this.names.indexOf(C)}get(C){let e=this.names,t=this.references,H=e.indexOf(C)
return-1===H?nC:t[H]}value(){let C=this.names,e=this.references,H=t()
for(let t=0;t<C.length;t++)H[C[t]]=e[t].value()
return H}}(s,H,H),new KC(s,H)
class JC{get(C){return QC.create(this,C)}}class YC extends JC{constructor(){super(...arguments),this._lastRevision=null,this._lastValue=null}value(){let C=this.tag,e=this._lastRevision,t=this._lastValue
return e&&C.validate(e)||(t=this._lastValue=this.compute(),this._lastRevision=C.value()),t}}class XC extends O{constructor(){super(...arguments),this.children=t()}get(C){let e=this.children[C]
return e||(e=this.children[C]=new Ce(this.inner,C)),e}}class QC extends YC{static create(C,e){return l(C)?new Ce(C.value(),e):new ee(C,e)}get(C){return new ee(this,C)}}class Ce extends QC{constructor(C,e){super(),this._parentValue=C,this._propertyKey=e,this.tag=q(C,e)}compute(){return this._parentValue[this._propertyKey]}}class ee extends QC{constructor(C,e){super()
let t=C.tag,H=y.create(s)
this._parentReference=C,this._parentObjectTag=H,this._propertyKey=e,this.tag=m([t,H])}compute(){let C=this._parentReference,e=this._parentObjectTag,t=this._propertyKey,H=C.value()
return e.inner.update(q(H,t)),"string"==typeof H&&"length"===t?H.length:"object"==typeof H&&H?H[t]:void 0}}class te extends JC{constructor(C){super(),this.tag=u.create(),this._value=C}value(){return this._value}update(C){C!==this._value&&(this.tag.inner.dirty(),this._value=C)}}class He{constructor(C,e,t,H){let i=C.ComponentClass,V=C.name
this.args=e
let n={debugName:V,args:this.namedArgsSnapshot()}
H.setOwner(n,t),i&&(this.component=i.create(n))}get tag(){return this.args.tag}namedArgsSnapshot(){return Object.freeze(this.args.named.value())}}const ie=new XC(null)
class Ve{static create(C){return new Ve(C)}constructor(C){this.env=C.env}prepareArgs(C,e){return null}getCapabilities(C){return C.capabilities}getLayout({name:C,handle:e,symbolTable:t},H){return e&&t?{handle:e,symbolTable:t}:H.compileTemplate(C,e)}create(C,e,t,H,i,V){if(e.ComponentClass){let C=this.env.getOwner()
return new He(e,t.capture(),C,this.env)}}getSelf(C){return C?new XC(C.component):ie}didCreateElement(C,e){}didRenderLayout(C,e){C&&(C.component.bounds=new X(e))}didCreate(C){C&&C.component.didInsertElement()}getTag(C){return C?C.tag:s}update(C,e){C&&(C.component.args=C.namedArgsSnapshot())}didUpdateLayout(){}didUpdate(C){C&&C.component.didUpdate()}getDestructor(C){return C?C.component:ne}}const ne={destroy(){}}
function re(C,e,t){function H(){return Reflect.construct(HTMLElement,[],H)}H.prototype=Object.create(HTMLElement.prototype,{constructor:{value:H},connectedCallback:{value:function(){let e=document.createElement("span"),H=this.parentNode
H.insertBefore(e,this),H.removeChild(this),C.renderComponent(t,H,e),function C(e,t){e._rendering?requestAnimationFrame(()=>{C(e,t)}):t()}(C,()=>{let C=e.previousElementSibling
e.remove(),function(C,e){let t=C.attributes
for(let i=0;i<t.length;i++){var H=t.item(i)
let C=H.name,V=H.value
e.setAttribute(C,V)}}(this,C)})}}}),window.customElements.define(e,H)}class Le{constructor(C,e=null){this._registry=C,this._resolver=e,this._lookups={},this._factoryDefinitionLookups={}}factoryFor(C){let e=this._factoryDefinitionLookups[C]
if(e||(this._resolver&&(e=this._resolver.retrieve(C)),e||(e=this._registry.registration(C)),e&&(this._factoryDefinitionLookups[C]=e)),e)return this.buildFactory(C,e)}lookup(C){let e=!1!==this._registry.registeredOption(C,"singleton")
if(e&&this._lookups[C])return this._lookups[C]
let t=this.factoryFor(C)
if(!t)return
if(!1===this._registry.registeredOption(C,"instantiate"))return t.class
let H=t.create()
return e&&H&&(this._lookups[C]=H),H}defaultInjections(C){return{}}buildInjections(C){let e,t=this.defaultInjections(C),H=this._registry.registeredInjections(C)
for(let i=0;i<H.length;i++)t[(e=H[i]).property]=this.lookup(e.source)
return t}buildFactory(C,e){let t=this.buildInjections(C)
return{class:e,create(C){let H=Object.assign({},t,C)
return e.create(H)}}}}class oe{constructor(C){this._registrations={},this._registeredOptions={},this._registeredInjections={},C&&C.fallback&&(this._fallback=C.fallback)}register(C,e,t){this._registrations[C]=e,t&&(this._registeredOptions[C]=t)}registration(C){let e=this._registrations[C]
return void 0===e&&this._fallback&&(e=this._fallback.registration(C)),e}unregister(C){delete this._registrations[C],delete this._registeredOptions[C],delete this._registeredInjections[C]}registerOption(C,e,t){let H=this._registeredOptions[C]
H||(H={},this._registeredOptions[C]=H),H[e]=t}registeredOption(C,e){let t,H=this.registeredOptions(C)
return H&&(t=H[e]),void 0===t&&void 0!==this._fallback&&(t=this._fallback.registeredOption(C,e)),t}registeredOptions(C){let e=this._registeredOptions[C]
if(void 0===e){let t=C.split(":")[0]
e=this._registeredOptions[t]}return e}unregisterOption(C,e){let t=this._registeredOptions[C]
t&&delete t[e]}registerInjection(C,e,t){let H=this._registeredInjections[C]
void 0===H&&(this._registeredInjections[C]=H=[]),H.push({property:e,source:t})}registeredInjections(C){let e=C.split(":")[0],t=this._fallback?this._fallback.registeredInjections(C):[]
return Array.prototype.push.apply(t,this._registeredInjections[e]),Array.prototype.push.apply(t,this._registeredInjections[C]),t}}const se="__owner__"
function ae(C){return C[se]}function Me(C,e){C[se]=e}function le(C="unreachable"){return new Error(C)}function de(C,e){if(!C)throw new Error(e||"assertion failure")}const ce=Object.keys
function ue(C){for(let e=1;e<arguments.length;e++){let t=arguments[e]
if(null===t||"object"!=typeof t)continue
let H=ce(t)
for(let e=0;e<H.length;e++){let i=H[e]
C[i]=t[i]}}return C}let he=0
function pe(C){return C._guid=++he}function me(){return Object.create(null)}class fe{constructor(){this.stack=[],this.current=null}get size(){return this.stack.length}push(C){this.current=C,this.stack.push(C)}pop(){let C=this.stack.pop(),e=this.stack.length
return this.current=0===e?null:this.stack[e-1],void 0===C?null:C}isEmpty(){return 0===this.stack.length}}class ge{constructor(){this.clear()}head(){return this._head}tail(){return this._tail}clear(){this._head=this._tail=null}toArray(){let C=[]
return this.forEachNode(e=>C.push(e)),C}nextNode(C){return C.next}forEachNode(C){let e=this._head
for(;null!==e;)C(e),e=e.next}insertBefore(C,e=null){return null===e?this.append(C):(e.prev?e.prev.next=C:this._head=C,C.prev=e.prev,C.next=e,e.prev=C,C)}append(C){let e=this._tail
return e?(e.next=C,C.prev=e,C.next=null):this._head=C,this._tail=C}remove(C){return C.prev?C.prev.next=C.next:this._head=C.next,C.next?C.next.prev=C.prev:this._tail=C.prev,C}}class Ze{constructor(C,e){this._head=C,this._tail=e}forEachNode(C){let e=this._head
for(;null!==e;)C(e),e=this.nextNode(e)}head(){return this._head}tail(){return this._tail}toArray(){let C=[]
return this.forEachNode(e=>C.push(e)),C}nextNode(C){return C===this._tail?null:C.next}}const ve=Object.freeze([])
class ye{constructor(C,e){this._registry=C,this._resolver=e}register(C,e,t){let H=this._toAbsoluteSpecifier(C)
this._registry.register(H,e,t)}registration(C){let e=this._toAbsoluteSpecifier(C)
return this._registry.registration(e)}unregister(C){let e=this._toAbsoluteSpecifier(C)
this._registry.unregister(e)}registerOption(C,e,t){let H=this._toAbsoluteOrTypeSpecifier(C)
this._registry.registerOption(H,e,t)}registeredOption(C,e){let t=this._toAbsoluteOrTypeSpecifier(C)
return this._registry.registeredOption(t,e)}registeredOptions(C){let e=this._toAbsoluteOrTypeSpecifier(C)
return this._registry.registeredOptions(e)}unregisterOption(C,e){let t=this._toAbsoluteOrTypeSpecifier(C)
this._registry.unregisterOption(t,e)}registerInjection(C,e,t){let H=this._toAbsoluteOrTypeSpecifier(C),i=this._toAbsoluteSpecifier(t)
this._registry.registerInjection(H,e,i)}registeredInjections(C){let e=this._toAbsoluteOrTypeSpecifier(C)
return this._registry.registeredInjections(e)}_toAbsoluteSpecifier(C,e){return this._resolver.identify(C,e)}_toAbsoluteOrTypeSpecifier(C){return function(C){return-1===C.indexOf(":")}(C)?C:this._toAbsoluteSpecifier(C)}}class be{constructor(C=null){this.bucket=C?ue({},C):{}}get(C){return this.bucket[C]}set(C,e){return this.bucket[C]=e}child(){return new be(this.bucket)}}const ke=new class{constructor(){this.evaluateOpcode=function(C){let e=new Array(C)
for(let t=0;t<C;t++)e[t]=null
return e}(98).slice()}add(C,e,t="syscall"){this.evaluateOpcode[C]={syscall:"syscall"===t,evaluate:e}}debugBefore(C,e,t){return{sp:void 0,state:void 0}}debugAfter(C,e,t,H){H.sp,H.state}evaluate(C,e,t){let H=this.evaluateOpcode[t]
H.syscall?H.evaluate(C,e):H.evaluate(C.inner,e)}}
class we{constructor(){pe(this)}}class Se extends we{constructor(){super(...arguments),this.next=null,this.prev=null}}var Oe;(function(C){C[C.pc=0]="pc",C[C.ra=1]="ra",C[C.fp=2]="fp",C[C.sp=3]="sp",C[C.s0=4]="s0",C[C.s1=5]="s1",C[C.t0=6]="t0",C[C.t1=7]="t1",C[C.v0=8]="v0"})(Oe||(Oe={}))
class xe extends O{constructor(C){super(C)}static create(C){return void 0===C?Be:null===C?Ee:!0===C?De:!1===C?Ne:"number"==typeof C?new Te(C):new Ae(C)}get(C){return Be}}class Ae extends xe{constructor(){super(...arguments),this.lengthReference=null}get(C){if("length"===C){let C=this.lengthReference
return null===C&&(C=this.lengthReference=new Te(this.inner.length)),C}return super.get(C)}}class Te extends xe{constructor(C){super(C)}}const Be=new Te(void 0),Ee=new Te(null),De=new Te(!0),Ne=new Te(!1)
class Pe{constructor(C){this.inner=C,this.tag=C.tag}value(){return this.toBool(this.inner.value())}toBool(C){return!!C}}class Re extends b{constructor(C){super(),this.parts=C,this.tag=h(C)}compute(){let C=new Array
for(let e=0;e<this.parts.length;e++){let t=this.parts[e].value()
null!=t&&(C[e]=Fe(t))}return C.length>0?C.join(""):null}}function Fe(C){return"function"!=typeof C.toString?"":String(C)}ke.add(1,(C,{op1:e})=>{let t=C.stack,H=C.constants.resolveHandle(e)(C,t.pop())
C.loadValue(Oe.v0,H)}),ke.add(6,(C,{op1:e})=>{let t=C.referenceForSymbol(e)
C.stack.push(t)}),ke.add(4,(C,{op1:e})=>{let t=C.stack.pop()
C.scope().bindSymbol(e,t)}),ke.add(5,(C,{op1:e})=>{let t=C.stack.pop(),H=C.stack.pop(),i=C.stack.pop(),V=i?[t,H,i]:null
C.scope().bindBlock(e,V)}),ke.add(96,(C,{op1:e})=>{let t=C.constants.getString(e),H=C.scope().getPartialMap()[t]
void 0===H&&(H=C.getSelf().get(t)),C.stack.push(H)}),ke.add(20,(C,{op1:e,op2:t})=>{C.pushRootScope(e,!!t)}),ke.add(7,(C,{op1:e})=>{let t=C.constants.getString(e),H=C.stack.pop()
C.stack.push(H.get(t))}),ke.add(8,(C,{op1:e})=>{let t=C.stack,H=C.scope().getBlock(e)
H?(t.push(H[2]),t.push(H[1]),t.push(H[0])):(t.push(null),t.push(null),t.push(null))}),ke.add(9,(C,{op1:e})=>{let t=!!C.scope().getBlock(e)
C.stack.push(t?De:Ne)}),ke.add(10,C=>{C.stack.pop(),C.stack.pop()
let e=C.stack.pop(),t=e&&e.parameters.length
C.stack.push(t?De:Ne)}),ke.add(11,(C,{op1:e})=>{let t=new Array(e)
for(let H=e;H>0;H--){t[H-1]=C.stack.pop()}C.stack.push(new Re(t))})
const Ie="CURRIED COMPONENT DEFINITION [id=6f00feb9-a0ef-4547-99ea-ac328f80acea]"
function _e(C){return!(!C||!C[Ie])}class ze{constructor(C,e){this.inner=C,this.args=e,this[Ie]=!0}unwrap(C){C.realloc(this.offset)
let e=this
for(;;){var t=e
let H=t.args,i=t.inner
if(H&&(C.positional.prepend(H.positional),C.named.merge(H.named)),!_e(i))return i
e=i}}get offset(){let C=this.inner,e=this.args,t=e?e.positional.length:0
return _e(C)?t+C.offset:t}}function We(C){return je(C)?"":String(C)}function je(C){return null==C||"function"!=typeof C.toString}function Ue(C){return"object"==typeof C&&null!==C&&"function"==typeof C.toHTML}function Ge(C){return"object"==typeof C&&null!==C&&"number"==typeof C.nodeType}function $e(C){return"string"==typeof C}class qe extends Se{constructor(C,e,t){super(),this.node=C,this.reference=e,this.lastValue=t,this.type="dynamic-text",this.tag=e.tag,this.lastRevision=this.tag.value()}evaluate(){let C=this.reference,e=this.tag
e.validate(this.lastRevision)||(this.lastRevision=e.value(),this.update(C.value()))}update(C){let e,t=this.lastValue
if(C!==t&&(e=je(C)?"":$e(C)?C:String(C))!==t){this.node.nodeValue=this.lastValue=e}}}class Ke extends Pe{static create(C){return new Ke(C)}toBool(C){return _e(C)}}class Je{constructor(C){this.inner=C,this.tag=C.tag}value(){let C=this.inner.value()
return function(C){return $e(C)||je(C)||"boolean"==typeof C||"number"==typeof C}(C)?1:(e=C)&&e[Ie]?0:Ue(C)?3:function(C){return Ge(C)&&11===C.nodeType}(C)?4:Ge(C)?5:1
var e}}ke.add(28,C=>{let e=C.stack.pop().value(),t=je(e)?"":String(e)
C.elements().appendDynamicHTML(t)}),ke.add(29,C=>{let e=C.stack.pop().value().toHTML(),t=je(e)?"":e
C.elements().appendDynamicHTML(t)}),ke.add(32,C=>{let e=C.stack.pop(),t=e.value(),H=je(t)?"":String(t),i=C.elements().appendDynamicText(H)
l(e)||C.updateWith(new qe(i,e,H))}),ke.add(30,C=>{let e=C.stack.pop().value()
C.elements().appendDynamicFragment(e)}),ke.add(31,C=>{let e=C.stack.pop().value()
C.elements().appendDynamicNode(e)}),ke.add(22,C=>C.pushChildScope()),ke.add(23,C=>C.popScope()),ke.add(44,C=>C.pushDynamicScope()),ke.add(45,C=>C.popDynamicScope()),ke.add(12,(C,{op1:e})=>{C.stack.push(C.constants.getOther(e))}),ke.add(13,(C,{op1:e})=>{let t=C.stack,H=e>>3
switch(7&e){case 0:t.push(H)
break
case 1:t.push(C.constants.getNumber(H))
break
case 2:t.push(C.constants.getString(H))
break
case 3:t.pushEncodedImmediate(e)
break
case 4:case 5:t.push(C.constants.getNumber(H))}}),ke.add(14,C=>{let e=C.stack
e.push(xe.create(e.pop()))}),ke.add(15,C=>{let e=C.stack
e.push(e.peek().value())}),ke.add(16,(C,{op1:e,op2:t})=>{let H=C.fetchValue(e)-t
C.stack.dup(H)}),ke.add(17,(C,{op1:e})=>{C.stack.pop(e)}),ke.add(18,(C,{op1:e})=>{C.load(e)}),ke.add(19,(C,{op1:e})=>{C.fetch(e)}),ke.add(43,(C,{op1:e})=>{let t=C.constants.getArray(e)
C.bindDynamicScope(t)}),ke.add(61,(C,{op1:e})=>{C.enter(e)}),ke.add(62,C=>{C.exit()}),ke.add(48,(C,{op1:e})=>{C.stack.push(C.constants.getSerializable(e))}),ke.add(47,C=>{C.stack.push(C.scope())}),ke.add(46,C=>{let e=C.stack,t=e.pop()
t?e.pushSmi(t.compile()):e.pushNull()}),ke.add(51,C=>{let e=C.stack,t=e.pop(),H=e.pop(),i=e.pop(),V=e.pop()
if(null===i)return C.pushFrame(),void C.pushScope(H)
let n=H
{let C=i.parameters,e=C.length
if(e>0){n=n.child()
for(let t=0;t<e;t++)n.bindSymbol(C[t],V.at(t))}}C.pushFrame(),C.pushScope(n),C.call(t)}),ke.add(53,(C,{op1:e})=>{let t=C.stack.pop()
if(l(t))t.value()&&C.goto(e)
else{let H=new k(t)
H.peek()&&C.goto(e),C.updateWith(new Ye(H))}}),ke.add(54,(C,{op1:e})=>{let t=C.stack.pop()
if(l(t))t.value()||C.goto(e)
else{let H=new k(t)
H.peek()||C.goto(e),C.updateWith(new Ye(H))}}),ke.add(55,(C,{op1:e,op2:t})=>{C.stack.peek()===t&&C.goto(e)}),ke.add(56,C=>{let e=C.stack.peek()
l(e)||C.updateWith(Ye.initialize(new k(e)))}),ke.add(63,C=>{let e=C.env,t=C.stack
t.push(e.toConditionalReference(t.pop()))})
class Ye extends Se{constructor(C){super(),this.type="assert",this.tag=C.tag,this.cache=C}static initialize(C){let e=new Ye(C)
return C.peek(),e}evaluate(C){S(this.cache.revalidate())&&C.throw()}}class Xe extends Se{constructor(C,e){super(),this.target=e,this.type="jump-if-not-modified",this.tag=C,this.lastRevision=C.value()}evaluate(C){let e=this.tag,t=this.target,H=this.lastRevision
!C.alwaysRevalidate&&e.validate(H)&&C.goto(t)}didModify(){this.lastRevision=this.tag.value()}}class Qe extends Se{constructor(C){super(),this.target=C,this.type="did-modify",this.tag=s}evaluate(){this.target.didModify()}}class Ct{constructor(C){this.tag=s,this.type="label",this.label=null,this.prev=null,this.next=null,pe(this),this.label=C}evaluate(){}inspect(){return`${this.label} [${this._guid}]`}}ke.add(26,(C,{op1:e})=>{C.elements().appendText(C.constants.getString(e))}),ke.add(27,(C,{op1:e})=>{C.elements().appendComment(C.constants.getString(e))}),ke.add(33,(C,{op1:e})=>{C.elements().openElement(C.constants.getString(e))}),ke.add(34,C=>{let e=C.stack.pop().value()
C.elements().openElement(e)}),ke.add(41,C=>{let e,t,H=C.stack.pop(),i=C.stack.pop(),V=C.stack.pop().value()
if(l(H))e=H.value()
else{let t=new k(H)
e=t.peek(),C.updateWith(new Ye(t))}if(l(i))t=i.value()
else{let e=new k(i)
t=e.peek(),C.updateWith(new Ye(e))}C.elements().pushRemoteElement(e,V,t)}),ke.add(42,C=>{C.elements().popRemoteElement()}),ke.add(38,C=>{let e=C.fetchValue(Oe.t0)
e&&(e.flush(C),C.loadValue(Oe.t0,null)),C.elements().flushElement()}),ke.add(39,C=>{C.elements().closeElement()}),ke.add(40,(C,{op1:e})=>{let t=C.constants.resolveHandle(e),H=C.stack.pop()
var i=C.elements()
let V=i.constructing,n=i.updateOperations,r=C.dynamicScope(),L=t.create(V,H,r,n)
C.env.scheduleInstallModifier(L,t)
let o=t.getDestructor(L)
o&&C.newDestroyable(o)
let s=t.getTag(L)
d(s)||C.updateWith(new et(s,t,L))})
class et extends Se{constructor(C,e,t){super(),this.tag=C,this.manager=e,this.modifier=t,this.type="update-modifier",this.lastUpdated=C.value()}evaluate(C){let e=this.manager,t=this.modifier,H=this.tag,i=this.lastUpdated
H.validate(i)||(C.env.scheduleUpdateModifier(t,e),this.lastUpdated=H.value())}}ke.add(35,(C,{op1:e,op2:t,op3:H})=>{let i=C.constants.getString(e),V=C.constants.getString(t),n=H?C.constants.getString(H):null
C.elements().setStaticAttribute(i,V,n)}),ke.add(36,(C,{op1:e,op2:t,op3:H})=>{let i=C.constants.getString(e),V=C.stack.pop(),n=V.value(),r=H?C.constants.getString(H):null,L=C.elements().setDynamicAttribute(i,n,!!t,r)
l(V)||C.updateWith(new tt(V,L))})
class tt extends Se{constructor(C,e){super(),this.reference=C,this.attribute=e,this.type="patch-element",this.tag=C.tag,this.lastRevision=this.tag.value()}evaluate(C){let e=this.attribute,t=this.reference,H=this.tag
H.validate(this.lastRevision)||(this.lastRevision=H.value(),e.update(t.value(),C.env))}}function Ht(C,e,t){return C.lookupComponentDefinition(e,t)}class it{constructor(C,e,t,H){this.inner=C,this.resolver=e,this.meta=t,this.args=H,this.tag=C.tag,this.lastValue=null,this.lastDefinition=null}value(){let C=this.inner,e=this.lastValue,t=C.value()
if(t===e)return this.lastDefinition
let H=null
if(_e(t))H=t
else if("string"==typeof t&&t){H=Ht(this.resolver,t,this.meta)}return H=this.curry(H),this.lastValue=t,this.lastDefinition=H,H}get(){return Be}curry(C){let e=this.args
return!e&&_e(C)?C:C?new ze(C,e):null}}class Vt{constructor(C){this.list=C,this.tag=h(C),this.list=C}value(){let C=[],e=this.list
for(let t=0;t<e.length;t++){let H=We(e[t].value())
H&&C.push(H)}return 0===C.length?null:C.join(" ")}}function nt(C){return 0|(C.dynamicLayout?1:0)|(C.dynamicTag?2:0)|(C.prepareArgs?4:0)|(C.createArgs?8:0)|(C.attributeHook?16:0)|(C.elementHook?32:0)|(C.dynamicScope?64:0)|(C.createCaller?128:0)|(C.updateHook?256:0)|(C.createInstance?512:0)}function rt(C,e){return!!(C&e)}ke.add(69,C=>{let e=C.stack,t=e.pop()
e.push(Ke.create(t))}),ke.add(70,C=>{let e=C.stack,t=e.peek()
e.push(new Je(t))}),ke.add(71,(C,{op1:e})=>{let t=C.stack,H=t.pop(),i=t.pop(),V=C.constants.getSerializable(e),n=C.constants.resolver
C.loadValue(Oe.v0,new it(H,n,V,i))}),ke.add(72,(C,{op1:e})=>{let t=C.constants.resolveHandle(e),H=t.manager,i=nt(H.getCapabilities(t.state)),V={definition:t,manager:H,capabilities:i,state:null,handle:null,table:null,lookup:null}
C.stack.push(V)}),ke.add(75,(C,{op1:e})=>{let t,H=C.stack,i=H.pop().value(),V=C.constants.getSerializable(e)
if(C.loadValue(Oe.t1,null),"string"==typeof i){t=Ht(C.constants.resolver,i,V)}else{if(!_e(i))throw le()
t=i}H.push(t)}),ke.add(73,C=>{let e,t,H=C.stack,i=H.pop()
_e(i)?t=e=null:e=nt((t=i.manager).getCapabilities(i.state)),H.push({definition:i,capabilities:e,manager:t,state:null,handle:null,table:null})}),ke.add(74,(C,{op1:e})=>{let t,H=C.stack,i=H.pop().value()
if(!_e(i))throw le()
t=i,H.push(t)}),ke.add(76,(C,{op1:e,op2:t})=>{let H=C.stack,i=C.constants.getStringArray(e),V=t>>4,n=8&t,r=[]
4&t&&r.push("main"),2&t&&r.push("else"),1&t&&r.push("attrs"),C.args.setup(H,i,r,V,!!n),H.push(C.args)}),ke.add(77,C=>{let e=C.stack
e.push(C.args.empty(e))}),ke.add(80,C=>{let e=C.stack,t=e.pop().capture()
e.push(t)}),ke.add(79,(C,{op1:e})=>{let t=C.stack,H=C.fetchValue(e),i=t.pop(),V=H.definition
_e(V)&&(V=function(C,e,t){let H=C.definition=e.unwrap(t),i=H.manager,V=H.state
return C.manager=i,C.capabilities=nt(i.getCapabilities(V)),H}(H,V,i))
var n=V
let r=n.manager,L=n.state
if(!0!==rt(H.capabilities,4))return void t.push(i)
let o=i.blocks.values,s=i.blocks.names,a=r.prepareArgs(L,i)
if(a){i.clear()
for(let i=0;i<o.length;i++)t.push(o[i])
let C=a.positional,e=a.named,H=C.length
for(let i=0;i<H;i++)t.push(C[i])
let V=Object.keys(e)
for(let i=0;i<V.length;i++)t.push(e[V[i]])
i.setup(t,V,s,H,!0)}t.push(i)}),ke.add(81,(C,{op1:e,op2:t})=>{let H=C.fetchValue(t),i=H.definition,V=H.manager,n=H.capabilities=nt(V.getCapabilities(i.state)),r=null
rt(n,64)&&(r=C.dynamicScope())
let L=1&e,o=null
rt(n,8)&&(o=C.stack.peek())
let s=null
rt(n,128)&&(s=C.getSelf())
let a=V.create(C.env,i.state,o,r,s,!!L)
H.state=a
let M=V.getTag(a)
rt(n,256)&&!d(M)&&C.updateWith(new st(M,a,V,r))}),ke.add(82,(C,{op1:e})=>{var t=C.fetchValue(e)
let H=t.manager,i=t.state,V=H.getDestructor(i)
V&&C.newDestroyable(V)}),ke.add(91,C=>{C.beginCacheGroup(),C.elements().pushSimpleBlock()}),ke.add(83,C=>{C.loadValue(Oe.t0,new Lt)}),ke.add(37,(C,{op1:e,op2:t,op3:H})=>{let i=C.constants.getString(e),V=C.stack.pop(),n=H?C.constants.getString(H):null
C.fetchValue(Oe.t0).setAttribute(i,V,!!t,n)})
class Lt{constructor(){this.attributes=me(),this.classes=[]}setAttribute(C,e,t,H){let i={value:e,namespace:H,trusting:t}
"class"===C&&this.classes.push(e),this.attributes[C]=i}flush(C){for(let e in this.attributes){let t=this.attributes[e],H=t.value,i=t.namespace,V=t.trusting
if("class"===e&&(H=new Vt(this.classes)),"type"===e)continue
let n=C.elements().setDynamicAttribute(e,H.value(),V,i)
l(H)||C.updateWith(new tt(H,n))}if("type"in this.attributes){let e=this.attributes.type,t=e.value,H=e.namespace,i=e.trusting,V=C.elements().setDynamicAttribute("type",t.value(),i,H)
l(t)||C.updateWith(new tt(t,V))}}}function ot(C,e,t,H,i){let V=t.table.symbols.indexOf(C),n=H.get(e);-1!==V&&i.scope().bindBlock(V+1,n),t.lookup&&(t.lookup[C]=n)}ke.add(93,(C,{op1:e})=>{var t=C.fetchValue(e)
let H=t.definition,i=t.state,V=H.manager,n=C.fetchValue(Oe.t0)
V.didCreateElement(i,C.elements().expectConstructing("DidCreateElementOpcode#evaluate"),n)}),ke.add(84,(C,{op1:e})=>{var t=C.fetchValue(e)
let H=t.definition,i=t.state,V=H.manager
C.stack.push(V.getSelf(i))}),ke.add(85,(C,{op1:e})=>{var t=C.fetchValue(e)
let H=t.definition,i=t.state,V=H.manager
C.stack.push(V.getTagName(i))}),ke.add(86,(C,{op1:e})=>{let t,H=C.fetchValue(e),i=H.manager,V=H.definition,n=C.constants.resolver,r=C.stack,L=H.state,o=H.capabilities,s=V.state
if(function(C,e){return!1===rt(C,1)}(o))t=i.getLayout(s,n)
else{if(!function(C,e){return!0===rt(C,1)}(o))throw le()
t=i.getDynamicLayout(L,n)}r.push(t.symbolTable),r.push(t.handle)}),ke.add(68,(C,{op1:e})=>{let t=C.stack.pop(),H=C.stack.pop(),i=t.manager,V=nt(i.getCapabilities(t.state)),n={definition:t,manager:i,capabilities:V,state:null,handle:H.handle,table:H.symbolTable,lookup:null}
C.loadValue(e,n)}),ke.add(89,(C,{op1:e})=>{let t=C.stack,H=t.pop(),i=t.pop(),V=C.fetchValue(e)
V.handle=H,V.table=i}),ke.add(21,(C,{op1:e})=>{let t=C.fetchValue(e).table.symbols
C.pushRootScope(t.length+1,!0)}),ke.add(87,(C,{op1:e})=>{let t=C.fetchValue(e)
if(t.table.hasEval){let e=t.lookup=me()
C.scope().bindEvalScope(e)}}),ke.add(2,(C,{op1:e})=>{let t=C.fetchValue(e),H=C.scope(),i=C.stack.peek(),V=i.named.atNames
for(let n=V.length-1;n>=0;n--){let C=V[n],e=t.table.symbols.indexOf(V[n]),r=i.named.get(C,!1);-1!==e&&H.bindSymbol(e+1,r),t.lookup&&(t.lookup[C]=r)}}),ke.add(3,(C,{op1:e})=>{let t=C.fetchValue(e)
let H=C.stack.peek().blocks
ot("&attrs","attrs",t,H,C),ot("&inverse","else",t,H,C),ot("&default","main",t,H,C)}),ke.add(90,(C,{op1:e})=>{let t=C.fetchValue(e)
C.call(t.handle)}),ke.add(94,(C,{op1:e})=>{var t=C.fetchValue(e)
let H=t.manager,i=t.state,V=C.elements().popBlock()
H.didRenderLayout(i,V),C.env.didCreate(i,H),C.updateWith(new at(H,i,V))}),ke.add(92,C=>{C.commitCacheGroup()})
class st extends Se{constructor(C,e,t,H){super(),this.tag=C,this.component=e,this.manager=t,this.dynamicScope=H,this.type="update-component"}evaluate(C){let e=this.component,t=this.manager,H=this.dynamicScope
t.update(e,H)}}class at extends Se{constructor(C,e,t){super(),this.manager=C,this.component=e,this.bounds=t,this.type="did-update-layout",this.tag=s}evaluate(C){let e=this.manager,t=this.component,H=this.bounds
e.didUpdateLayout(t,H),C.env.didUpdate(t,e)}}let Mt=function(C,e){console.info("Use `context`, and `get(<path>)` to debug this template."),e("this")}
class lt{constructor(C,e,t){this.scope=C,this.locals=me()
for(let H=0;H<t.length;H++){let i=t[H],V=e[i-1],n=C.getSymbol(i)
this.locals[V]=n}}get(C){let e=this.scope,t=this.locals,H=C.split(".")
var i=C.split(".")
let V,n=i[0],r=i.slice(1),L=e.getEvalScope()
return"this"===n?V=e.getSelf():t[n]?V=t[n]:0===n.indexOf("@")&&L[n]?V=L[n]:(V=this.scope.getSelf(),r=H),r.reduce((C,e)=>C.get(e),V)}}ke.add(97,(C,{op1:e,op2:t})=>{let H=C.constants.getStringArray(e),i=C.constants.getArray(t),V=new lt(C.scope(),H,i)
Mt(C.getSelf().value(),C=>V.get(C).value())}),ke.add(95,(C,{op1:e,op2:t,op3:H})=>{let i=C.constants,V=C.constants.resolver,n=C.stack.pop().value(),r=i.getSerializable(e),L=i.getStringArray(t),o=i.getArray(H),s=V.lookupPartial(n,r)
var a=V.resolve(s).getPartial()
let M=a.symbolTable,l=a.handle
{let e=M.symbols,t=C.scope(),H=C.pushRootScope(e.length,!1),i=t.getEvalScope()
H.bindCallerScope(t.getCallerScope()),H.bindEvalScope(i),H.bindSelf(t.getSelf())
let V=Object.create(t.getPartialMap())
for(let C=0;C<o.length;C++){let e=o[C],H=L[e-1],i=t.getSymbol(e)
V[H]=i}if(i)for(let C=0;C<e.length;C++){let t=C+1,V=i[e[C]]
void 0!==V&&H.bind(t,V)}H.bindPartialMap(V),C.pushFrame(),C.call(l)}})
class dt{constructor(C){this.tag=C.tag,this.artifacts=C}value(){return!this.artifacts.isEmpty()}}ke.add(66,C=>{let e=C.stack,t=e.pop(),H=e.pop(),i=C.env.iterableFor(t,H.value()),V=new E(i)
e.push(V),e.push(new dt(V.artifacts))}),ke.add(64,(C,{op1:e})=>{C.enterList(e)}),ke.add(65,C=>{C.exitList()}),ke.add(67,(C,{op1:e})=>{let t=C.stack.peek().next()
if(t){let e=C.iterate(t.memo,t.value)
C.enterItem(t.key,e)}else C.goto(e)})
class ct{constructor(C,e){this.element=C,this.nextSibling=e}}class ut{constructor(C,e,t){this.parentNode=C,this.first=e,this.last=t}parentElement(){return this.parentNode}firstNode(){return this.first}lastNode(){return this.last}}class ht{constructor(C,e){this.parentNode=C,this.node=e}parentElement(){return this.parentNode}firstNode(){return this.node}lastNode(){return this.node}}function pt(C,e){return new ht(C,e)}function mt(C,e){let t=C.parentElement(),H=C.firstNode(),i=C.lastNode(),V=H
for(;V;){let C=V.nextSibling
if(t.insertBefore(V,e),V===i)return C
V=C}return null}function ft(C){let e=C.parentElement(),t=C.firstNode(),H=C.lastNode(),i=t
for(;i;){let C=i.nextSibling
if(e.removeChild(i),i===H)return C
i=C}return null}const gt="http://www.w3.org/2000/svg"
function Zt(C,e,t){if(!C)return e
if(!function(C,e){let t=C.createElementNS(e,"svg")
try{t.insertAdjacentHTML("beforeend","<circle></circle>")}catch(H){}finally{return 1!==t.childNodes.length||t.firstChild.namespaceURI!==gt}}(C,t))return e
let H=C.createElement("div")
return class extends e{insertHTMLBefore(C,e,i){return null===i||""===i?super.insertHTMLBefore(C,e,i):C.namespaceURI!==t?super.insertHTMLBefore(C,e,i):function(C,e,t,H){let i="<svg>"+t+"</svg>"
e.innerHTML=i
var V=function(C,e,t){let H=C.firstChild,i=null,V=H
for(;V;)i=V,V=V.nextSibling,e.insertBefore(i,t)
return[H,i]}(e.firstChild,C,H)
let n=V[0],r=V[1]
return new ut(C,n,r)}(C,H,i,e)}}}function vt(C,e){return C&&function(C){let e=C.createElement("div")
if(e.innerHTML="first",e.insertAdjacentHTML("beforeend","second"),2===e.childNodes.length)return!1
return!0}(C)?class extends e{constructor(C){super(C),this.uselessComment=C.createComment("")}insertHTMLBefore(C,e,t){if(null===t)return super.insertHTMLBefore(C,e,t)
let H=!1,i=e?e.previousSibling:C.lastChild
i&&i instanceof Text&&(H=!0,C.insertBefore(this.uselessComment,e))
let V=super.insertHTMLBefore(C,e,t)
return H&&C.removeChild(this.uselessComment),V}}:e}const yt="http://www.w3.org/2000/svg",bt={foreignObject:1,desc:1,title:1},kt=Object.create(null);["b","big","blockquote","body","br","center","code","dd","div","dl","dt","em","embed","h1","h2","h3","h4","h5","h6","head","hr","i","img","li","listing","main","meta","nobr","ol","p","pre","ruby","s","small","span","strong","strike","sub","sup","table","tt","u","ul","var"].forEach(C=>kt[C]=1)
let wt="undefined"==typeof document?null:document
class St{constructor(C){this.document=C,this.setupUselessElement()}setupUselessElement(){this.uselessElement=this.document.createElement("div")}createElement(C,e){let t,H
if(e?(t=e.namespaceURI===yt||"svg"===C,H=bt[e.tagName]):(t="svg"===C,H=!1),t&&!H){if(kt[C])throw new Error(`Cannot create a ${C} inside an SVG context`)
return this.document.createElementNS(yt,C)}return this.document.createElement(C)}insertBefore(C,e,t){C.insertBefore(e,t)}insertHTMLBefore(C,e,t){return function(C,e,t,H){let i,V=e,n=t,r=n?n.previousSibling:V.lastChild
if(null===H||""===H)return new ut(V,null,null)
null===n?(V.insertAdjacentHTML("beforeend",H),i=V.lastChild):n instanceof HTMLElement?(n.insertAdjacentHTML("beforebegin",H),i=n.previousSibling):(V.insertBefore(C,n),C.insertAdjacentHTML("beforebegin",H),i=C.previousSibling,V.removeChild(C))
let L=r?r.nextSibling:V.firstChild
return new ut(V,L,i)}(this.uselessElement,C,e,t)}createTextNode(C){return this.document.createTextNode(C)}createComment(C){return this.document.createComment(C)}}var Ot;(function(C){class e extends St{createElementNS(C,e){return this.document.createElementNS(C,e)}setAttribute(C,e,t,H=null){H?C.setAttributeNS(H,e,t):C.setAttribute(e,t)}}C.TreeConstruction=e
let t=e
t=vt(wt,t),t=Zt(wt,t,yt),C.DOMTreeConstruction=t})(Ot||(Ot={}))
let xt=class extends St{constructor(C){super(C),this.document=C,this.namespace=null}setAttribute(C,e,t){C.setAttribute(e,t)}removeAttribute(C,e){C.removeAttribute(e)}insertAfter(C,e,t){this.insertBefore(C,e,t.nextSibling)}}
xt=vt(wt,xt)
var At=xt=Zt(wt,xt,yt)
const Tt=Ot.DOMTreeConstruction,Bt=["javascript:","vbscript:"],Et=["A","BODY","LINK","IMG","IFRAME","BASE","FORM"],Dt=["EMBED"],Nt=["href","src","background","action"],Pt=["src"]
function Rt(C,e){return-1!==C.indexOf(e)}function Ft(C,e){return(null===C||Rt(Et,C))&&Rt(Nt,e)}function It(C,e){return null!==C&&(Rt(Dt,C)&&Rt(Pt,e))}function _t(C,e){return Ft(C,e)||It(C,e)}function zt(C,e,t,H){let i=null
if(null==H)return H
if(Ue(H))return H.toHTML()
i=e?e.tagName.toUpperCase():null
let V=We(H)
if(Ft(i,t)){let e=C.protocolForURL(V)
if(Rt(Bt,e))return`unsafe:${V}`}return It(i,t)?`unsafe:${V}`:V}function Wt(C,e){let t,H
if(e in C)H=e,t="prop"
else{let i=e.toLowerCase()
i in C?(t="prop",H=i):(t="attr",H=e)}return"prop"!==t||"style"!==H.toLowerCase()&&!function(C,e){let t=jt[C.toUpperCase()]
return t&&t[e.toLowerCase()]||!1}(C.tagName,H)||(t="attr"),{normalized:H,type:t}}const jt={INPUT:{form:!0,autocorrect:!0,list:!0},SELECT:{form:!0},OPTION:{form:!0},TEXTAREA:{form:!0},LABEL:{form:!0},FIELDSET:{form:!0},LEGEND:{form:!0},OBJECT:{form:!0},BUTTON:{form:!0}}
function Ut(C,e,t){let H=C.tagName,i={element:C,name:e,namespace:t}
if(C.namespaceURI===yt)return Gt(H,e,i)
var V=Wt(C,e)
let n=V.type,r=V.normalized
return"attr"===n?Gt(H,r,i):function(C,e,t){if(_t(C,e))return new Jt(e,t)
if(function(C,e){return("INPUT"===C||"TEXTAREA"===C)&&"value"===e}(C,e))return new Xt(e,t)
if(function(C,e){return"OPTION"===C&&"selected"===e}(C,e))return new Qt(e,t)
return new Kt(e,t)}(H,r,i)}function Gt(C,e,t){return _t(C,e)?new Yt(t):new qt(t)}class $t{constructor(C){this.attribute=C}}class qt extends $t{set(C,e,t){let H=CH(e)
if(null!==H){var i=this.attribute
let e=i.name,t=i.namespace
C.__setAttribute(e,H,t)}}update(C,e){let t=CH(C)
var H=this.attribute
let i=H.element,V=H.name
null===t?i.removeAttribute(V):i.setAttribute(V,t)}}class Kt extends $t{constructor(C,e){super(e),this.normalizedName=C}set(C,e,t){null!=e&&(this.value=e,C.__setProperty(this.normalizedName,e))}update(C,e){let t=this.attribute.element
this.value!==C&&(t[this.normalizedName]=this.value=C,null==C&&this.removeAttribute())}removeAttribute(){var C=this.attribute
let e=C.element,t=C.namespace
t?e.removeAttributeNS(t,this.normalizedName):e.removeAttribute(this.normalizedName)}}class Jt extends Kt{set(C,e,t){var H=this.attribute
let i=zt(t,H.element,H.name,e)
super.set(C,i,t)}update(C,e){var t=this.attribute
let H=zt(e,t.element,t.name,C)
super.update(H,e)}}class Yt extends qt{set(C,e,t){var H=this.attribute
let i=zt(t,H.element,H.name,e)
super.set(C,i,t)}update(C,e){var t=this.attribute
let H=zt(e,t.element,t.name,C)
super.update(H,e)}}class Xt extends Kt{set(C,e){C.__setProperty("value",We(e))}update(C){let e=this.attribute.element,t=e.value,H=We(C)
t!==H&&(e.value=H)}}class Qt extends Kt{set(C,e){null!=e&&!1!==e&&C.__setProperty("selected",!0)}update(C){let e=this.attribute.element
e.selected=!!C}}function CH(C){return!1===C||null==C||void 0===C.toString?null:!0===C?"":"function"==typeof C?null:String(C)}class eH{constructor(C,e,t,H){this.slots=C,this.callerScope=e,this.evalScope=t,this.partialMap=H}static root(C,e=0){let t=new Array(e+1)
for(let H=0;H<=e;H++)t[H]=Be
return new eH(t,null,null,null).init({self:C})}static sized(C=0){let e=new Array(C+1)
for(let t=0;t<=C;t++)e[t]=Be
return new eH(e,null,null,null)}init({self:C}){return this.slots[0]=C,this}getSelf(){return this.get(0)}getSymbol(C){return this.get(C)}getBlock(C){let e=this.get(C)
return e===Be?null:e}getEvalScope(){return this.evalScope}getPartialMap(){return this.partialMap}bind(C,e){this.set(C,e)}bindSelf(C){this.set(0,C)}bindSymbol(C,e){this.set(C,e)}bindBlock(C,e){this.set(C,e)}bindEvalScope(C){this.evalScope=C}bindPartialMap(C){this.partialMap=C}bindCallerScope(C){this.callerScope=C}getCallerScope(){return this.callerScope}child(){return new eH(this.slots.slice(),this.callerScope,this.evalScope,this.partialMap)}get(C){if(C>=this.slots.length)throw new RangeError(`BUG: cannot get $${C} from scope; length=${this.slots.length}`)
return this.slots[C]}set(C,e){if(C>=this.slots.length)throw new RangeError(`BUG: cannot get $${C} from scope; length=${this.slots.length}`)
this.slots[C]=e}}class tH{constructor(){this.scheduledInstallManagers=[],this.scheduledInstallModifiers=[],this.scheduledUpdateModifierManagers=[],this.scheduledUpdateModifiers=[],this.createdComponents=[],this.createdManagers=[],this.updatedComponents=[],this.updatedManagers=[],this.destructors=[]}didCreate(C,e){this.createdComponents.push(C),this.createdManagers.push(e)}didUpdate(C,e){this.updatedComponents.push(C),this.updatedManagers.push(e)}scheduleInstallModifier(C,e){this.scheduledInstallManagers.push(e),this.scheduledInstallModifiers.push(C)}scheduleUpdateModifier(C,e){this.scheduledUpdateModifierManagers.push(e),this.scheduledUpdateModifiers.push(C)}didDestroy(C){this.destructors.push(C)}commit(){let C=this.createdComponents,e=this.createdManagers
for(let o=0;o<C.length;o++){let t=C[o]
e[o].didCreate(t)}let t=this.updatedComponents,H=this.updatedManagers
for(let o=0;o<t.length;o++){let C=t[o]
H[o].didUpdate(C)}let i=this.destructors
for(let o=0;o<i.length;o++)i[o].destroy()
let V=this.scheduledInstallManagers,n=this.scheduledInstallModifiers
for(let o=0;o<V.length;o++){let C=V[o],e=n[o]
C.install(e)}let r=this.scheduledUpdateModifierManagers,L=this.scheduledUpdateModifiers
for(let o=0;o<r.length;o++){let C=r[o],e=L[o]
C.update(e)}}}class HH{constructor({appendOperations:C,updateOperations:e}){this._transaction=null,this.appendOperations=C,this.updateOperations=e}toConditionalReference(C){return new Pe(C)}getAppendOperations(){return this.appendOperations}getDOM(){return this.updateOperations}begin(){this._transaction=new tH}get transaction(){return this._transaction}didCreate(C,e){this.transaction.didCreate(C,e)}didUpdate(C,e){this.transaction.didUpdate(C,e)}scheduleInstallModifier(C,e){this.transaction.scheduleInstallModifier(C,e)}scheduleUpdateModifier(C,e){this.transaction.scheduleUpdateModifier(C,e)}didDestroy(C){this.transaction.didDestroy(C)}commit(){let C=this.transaction
this._transaction=null,C.commit()}attributeFor(C,e,t,H=null){return Ut(C,e,H)}}class iH{constructor(C,e,t,H,i=-1,V=-1){this.stack=C,this.heap=e,this.program=t,this.externs=H,this.pc=i,this.ra=V,this.currentOpSize=0}pushFrame(){this.stack.pushSmi(this.ra),this.stack.pushSmi(this.stack.fp),this.stack.fp=this.stack.sp-1}popFrame(){this.stack.sp=this.stack.fp-1,this.ra=this.stack.getSmi(0),this.stack.fp=this.stack.getSmi(1)}pushSmallFrame(){this.stack.pushSmi(this.ra)}popSmallFrame(){this.ra=this.stack.popSmi()}goto(C){let e=this.pc+C-this.currentOpSize
this.pc=e}call(C){this.ra=this.pc,this.pc=this.heap.getaddr(C)}returnTo(C){let e=this.pc+C-this.currentOpSize
this.ra=e}return(){this.pc=this.ra}nextStatement(){let C=this.pc,e=this.program
if(-1===C)return null
let t=this.program.opcode(C).size,H=this.currentOpSize=t
return this.pc+=H,e.opcode(C)}evaluateOuter(C,e){this.evaluateInner(C,e)}evaluateInner(C,e){C.isMachine?this.evaluateMachine(C):this.evaluateSyscall(C,e)}evaluateMachine(C){switch(C.type){case 57:return this.pushFrame()
case 58:return this.popFrame()
case 59:return this.pushSmallFrame()
case 60:return this.popSmallFrame()
case 50:return this.call(C.op1)
case 49:return this.call(this.stack.popSmi())
case 52:return this.goto(C.op1)
case 24:return this.return()
case 25:return this.returnTo(C.op1)}}evaluateSyscall(C,e){ke.evaluate(e,C,C.type)}}class VH{constructor(C){this.node=C}firstNode(){return this.node}}class nH{constructor(C){this.node=C}lastNode(){return this.node}}class rH{constructor(C,e,t){this.constructing=null,this.operations=null,this.cursorStack=new fe,this.blockStack=new fe,this.pushElement(e,t),this.env=C,this.dom=C.getAppendOperations(),this.updateOperations=C.getDOM()}static forInitialRender(C,e){let t=new this(C,e.element,e.nextSibling)
return t.pushSimpleBlock(),t}static resume(C,e,t){let H=new this(C,e.parentElement(),t)
return H.pushSimpleBlock(),H.pushBlockTracker(e),H}get element(){return this.cursorStack.current.element}get nextSibling(){return this.cursorStack.current.nextSibling}expectConstructing(C){return this.constructing}block(){return this.blockStack.current}popElement(){this.cursorStack.pop(),this.cursorStack.current}pushSimpleBlock(){return this.pushBlockTracker(new LH(this.element))}pushUpdatableBlock(){return this.pushBlockTracker(new sH(this.element))}pushBlockList(C){return this.pushBlockTracker(new aH(this.element,C))}pushBlockTracker(C,e=!1){let t=this.blockStack.current
return null!==t&&(t.newDestroyable(C),e||t.didAppendBounds(C)),this.__openBlock(),this.blockStack.push(C),C}popBlock(){return this.block().finalize(this),this.__closeBlock(),this.blockStack.pop()}__openBlock(){}__closeBlock(){}openElement(C){let e=this.__openElement(C)
return this.constructing=e,e}__openElement(C){return this.dom.createElement(C,this.element)}flushElement(){let C=this.element,e=this.constructing
this.__flushElement(C,e),this.constructing=null,this.operations=null,this.pushElement(e,null),this.didOpenElement(e)}__flushElement(C,e){this.dom.insertBefore(C,e,this.nextSibling)}closeElement(){this.willCloseElement(),this.popElement()}pushRemoteElement(C,e,t=null){this.__pushRemoteElement(C,e,t)}__pushRemoteElement(C,e,t){this.pushElement(C,t)
let H=new oH(C)
this.pushBlockTracker(H,!0)}popRemoteElement(){this.popBlock(),this.popElement()}pushElement(C,e){this.cursorStack.push(new ct(C,e))}didAddDestroyable(C){this.block().newDestroyable(C)}didAppendBounds(C){return this.block().didAppendBounds(C),C}didAppendNode(C){return this.block().didAppendNode(C),C}didOpenElement(C){return this.block().openElement(C),C}willCloseElement(){this.block().closeElement()}appendText(C){return this.didAppendNode(this.__appendText(C))}__appendText(C){let e=this.dom,t=this.element,H=this.nextSibling,i=e.createTextNode(C)
return e.insertBefore(t,i,H),i}__appendNode(C){return this.dom.insertBefore(this.element,C,this.nextSibling),C}__appendFragment(C){let e=C.firstChild
if(e){let t=function(C,e,t){return new ut(C,e,t)}(this.element,e,C.lastChild)
return this.dom.insertBefore(this.element,C,this.nextSibling),t}return pt(this.element,this.__appendComment(""))}__appendHTML(C){return this.dom.insertHTMLBefore(this.element,this.nextSibling,C)}appendDynamicHTML(C){let e=this.trustedContent(C)
this.didAppendBounds(e)}appendDynamicText(C){let e=this.untrustedContent(C)
return this.didAppendNode(e),e}appendDynamicFragment(C){let e=this.__appendFragment(C)
this.didAppendBounds(e)}appendDynamicNode(C){let e=this.__appendNode(C),t=pt(this.element,e)
this.didAppendBounds(t)}trustedContent(C){return this.__appendHTML(C)}untrustedContent(C){return this.__appendText(C)}appendComment(C){return this.didAppendNode(this.__appendComment(C))}__appendComment(C){let e=this.dom,t=this.element,H=this.nextSibling,i=e.createComment(C)
return e.insertBefore(t,i,H),i}__setAttribute(C,e,t){this.dom.setAttribute(this.constructing,C,e,t)}__setProperty(C,e){this.constructing[C]=e}setStaticAttribute(C,e,t){this.__setAttribute(C,e,t)}setDynamicAttribute(C,e,t,H){let i=this.constructing,V=this.env.attributeFor(i,C,t,H)
return V.set(this,e,this.env),V}}class LH{constructor(C){this.parent=C,this.first=null,this.last=null,this.destroyables=null,this.nesting=0}destroy(){let C=this.destroyables
if(C&&C.length)for(let e=0;e<C.length;e++)C[e].destroy()}parentElement(){return this.parent}firstNode(){return this.first&&this.first.firstNode()}lastNode(){return this.last&&this.last.lastNode()}openElement(C){this.didAppendNode(C),this.nesting++}closeElement(){this.nesting--}didAppendNode(C){0===this.nesting&&(this.first||(this.first=new VH(C)),this.last=new nH(C))}didAppendBounds(C){0===this.nesting&&(this.first||(this.first=C),this.last=C)}newDestroyable(C){this.destroyables=this.destroyables||[],this.destroyables.push(C)}finalize(C){this.first||C.appendComment("")}}class oH extends LH{destroy(){super.destroy(),ft(this)}}class sH extends LH{reset(C){let e=this.destroyables
if(e&&e.length)for(let H=0;H<e.length;H++)C.didDestroy(e[H])
let t=ft(this)
return this.first=null,this.last=null,this.destroyables=null,this.nesting=0,t}}class aH{constructor(C,e){this.parent=C,this.boundList=e,this.parent=C,this.boundList=e}destroy(){this.boundList.forEachNode(C=>C.destroy())}parentElement(){return this.parent}firstNode(){let C=this.boundList.head()
return C&&C.firstNode()}lastNode(){let C=this.boundList.tail()
return C&&C.lastNode()}openElement(C){}closeElement(){}didAppendNode(C){}didAppendBounds(C){}newDestroyable(C){}finalize(C){}}class MH{constructor(C=[]){this.vec=C}clone(){return new MH(this.vec.slice())}sliceFrom(C){return new MH(this.vec.slice(C))}slice(C,e){return new MH(this.vec.slice(C,e))}copy(C,e){this.vec[e]=this.vec[C]}writeRaw(C,e){this.vec[C]=e}writeSmi(C,e){var t
this.vec[C]=(t=e)<0?Math.abs(t)<<3|4:t<<3|0}getRaw(C){return this.vec[C]}getSmi(C){return function(C){switch(7&C){case 0:return C>>3
case 4:return-(C>>3)
default:throw new Error("unreachable")}}(this.vec[C])}reset(){this.vec.length=0}len(){return this.vec.length}}const lH=2147483648,dH=2147483647
class cH{constructor(C=new MH,e=[]){this.inner=C,this.js=e}slice(C,e){let t
return t="number"==typeof C&&"number"==typeof e?this.inner.slice(C,e):"number"==typeof C&&void 0===e?this.inner.sliceFrom(C):this.inner.clone(),new cH(t,this.js.slice(C,e))}sliceInner(C,e){let t=[]
for(let H=C;H<e;H++)t.push(this.get(H))
return t}copy(C,e){this.inner.copy(C,e)}write(C,e){if(function(C){let e=typeof C
if(null==C)return!0
switch(e){case"boolean":case"undefined":return!0
case"number":if(C%1!=0)return!1
let t=Math.abs(C)
return!(t>lH)
default:return!1}}(e))this.inner.writeRaw(C,hH(e))
else{let t=this.js.length
this.js.push(e),this.inner.writeRaw(C,t|lH)}}writeSmi(C,e){this.inner.writeSmi(C,e)}writeImmediate(C,e){this.inner.writeRaw(C,e)}get(C){let e=this.inner.getRaw(C)
return e&lH?this.js[e&dH]:function(C){switch(C){case 3:return!1
case 11:return!0
case 19:return null
case 27:return
default:return function(C){switch(7&C){case 0:return C>>3
case 4:return-(C>>3)
default:throw le()}}(C)}}(e)}getSmi(C){return this.inner.getSmi(C)}reset(){this.inner.reset(),this.js.length=0}get length(){return this.inner.len()}}class uH{constructor(C,e,t){this.stack=C,this.fp=e,this.sp=t}static empty(){return new this(new cH,0,-1)}static restore(C){let e=new cH
for(let t=0;t<C.length;t++)e.write(t,C[t])
return new this(e,0,C.length-1)}push(C){this.stack.write(++this.sp,C)}pushSmi(C){this.stack.writeSmi(++this.sp,C)}pushImmediate(C){this.stack.writeImmediate(++this.sp,hH(C))}pushEncodedImmediate(C){this.stack.writeImmediate(++this.sp,C)}pushNull(){this.stack.writeImmediate(++this.sp,19)}dup(C=this.sp){this.stack.copy(C,++this.sp)}copy(C,e){this.stack.copy(C,e)}pop(C=1){let e=this.stack.get(this.sp)
return this.sp-=C,e}popSmi(){return this.stack.getSmi(this.sp--)}peek(C=0){return this.stack.get(this.sp-C)}peekSmi(C=0){return this.stack.getSmi(this.sp-C)}get(C,e=this.fp){return this.stack.get(e+C)}getSmi(C,e=this.fp){return this.stack.getSmi(e+C)}set(C,e,t=this.fp){this.stack.write(t+e,C)}slice(C,e){return this.stack.slice(C,e)}sliceArray(C,e){return this.stack.sliceInner(C,e)}capture(C){let e=this.sp+1,t=e-C
return this.stack.sliceInner(t,e)}reset(){this.stack.reset()}toArray(){return this.stack.sliceInner(this.fp,this.sp+1)}}function hH(C){switch(typeof C){case"number":return function(C){return C<0?Math.abs(C)<<3|4:C<<3|0}(C)
case"boolean":return C?11:3
case"object":return 19
case"undefined":return 27
default:throw le()}}class pH{constructor(C,e,{alwaysRevalidate:t=!1}){this.frameStack=new fe,this.env=C,this.constants=e.constants,this.dom=C.getDOM(),this.alwaysRevalidate=t}execute(C,e){let t=this.frameStack
for(this.try(C,e);!t.isEmpty();){let C=this.frame.nextStatement()
null!==C?C.evaluate(this):this.frameStack.pop()}}get frame(){return this.frameStack.current}goto(C){this.frame.goto(C)}try(C,e){this.frameStack.push(new vH(C,e))}throw(){this.frame.handleException(),this.frameStack.pop()}}class mH extends Se{constructor(C,e,t,H,i){super(),this.start=C,this.state=e,this.runtime=t,this.type="block",this.next=null,this.prev=null,this.children=i,this.bounds=H}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}evaluate(C){C.try(this.children,null)}destroy(){this.bounds.destroy()}didDestroy(){this.runtime.env.didDestroy(this.bounds)}}class fH extends mH{constructor(C,e,t,H,i){super(C,e,t,H,i),this.type="try",this.tag=this._tag=y.create(s)}didInitializeChildren(){this._tag.inner.update(p(this.children))}evaluate(C){C.try(this.children,this)}handleException(){let C=this.state,e=this.bounds,t=this.children,H=this.start,i=this.prev,V=this.next,n=this.runtime
t.clear()
let r=rH.resume(n.env,e,e.reset(n.env)),L=EH.resume(C,n,r),o=new ge
L.execute(H,e=>{e.stack=uH.restore(C.stack),e.updatingOpcodeStack.push(o),e.updateWith(this),e.updatingOpcodeStack.push(t)}),this.prev=i,this.next=V}}class gH{constructor(C,e){this.opcode=C,this.marker=e,this.didInsert=!1,this.didDelete=!1,this.map=C.map,this.updating=C.children}insert(C,e,t,H){let i=this.map,V=this.opcode,n=this.updating,r=null,L=null
r=H?(L=i[H]).bounds.firstNode():this.marker
let o=V.vmForInsertion(r),s=null,a=V.start
o.execute(a,H=>{i[C]=s=H.iterate(t,e),H.updatingOpcodeStack.push(new ge),H.updateWith(s),H.updatingOpcodeStack.push(s.children)}),n.insertBefore(s,L),this.didInsert=!0}retain(C,e,t){}move(C,e,t,H){let i=this.map,V=this.updating,n=i[C],r=i[H]||null
mt(n,H?r.firstNode():this.marker),V.remove(n),V.insertBefore(n,r)}delete(C){let e=this.map,t=e[C]
t.didDestroy(),ft(t),this.updating.remove(t),delete e[C],this.didDelete=!0}done(){this.opcode.didInitializeChildren(this.didInsert||this.didDelete)}}class ZH extends mH{constructor(C,e,t,H,V,n){super(C,e,t,H,V),this.type="list-block",this.map=me(),this.lastIterated=i,this.artifacts=n
let r=this._tag=y.create(s)
this.tag=m([n.tag,r])}didInitializeChildren(C=!0){this.lastIterated=this.artifacts.tag.value(),C&&this._tag.inner.update(p(this.children))}evaluate(C){let e=this.artifacts,t=this.lastIterated
if(!e.tag.validate(t)){let t=this.bounds,H=C.dom,i=H.createComment("")
H.insertAfter(t.parentElement(),i,t.lastNode())
let V=new gH(this,i)
new N({target:V,artifacts:e}).sync(),this.parentElement().removeChild(i)}super.evaluate(C)}vmForInsertion(C){let e=this.bounds,t=this.state,H=this.runtime,i=rH.forInitialRender(H.env,{element:e.parentElement(),nextSibling:C})
return EH.resume(t,H,i)}}class vH{constructor(C,e){this.ops=C,this.exceptionHandler=e,this.current=C.head()}goto(C){this.current=C}nextStatement(){let C=this.current,e=this.ops
return C&&(this.current=e.nextNode(C)),C}handleException(){this.exceptionHandler&&this.exceptionHandler.handleException()}}class yH{constructor(C,e,t,H){this.env=C,this.program=e,this.updating=t,this.bounds=H}rerender({alwaysRevalidate:C=!1}={alwaysRevalidate:!1}){let e=this.env,t=this.program,H=this.updating
new pH(e,t,{alwaysRevalidate:C}).execute(H,this)}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}handleException(){throw"this should never happen"}destroy(){this.bounds.destroy(),ft(this.bounds)}}class bH{constructor(){this.stack=null,this.positional=new kH,this.named=new SH,this.blocks=new xH}empty(C){let e=C.sp+1
return this.named.empty(C,e),this.positional.empty(C,e),this.blocks.empty(C,e),this}setup(C,e,t,H,i){this.stack=C
let V=this.named,n=e.length,r=C.sp-n+1
V.setup(C,r,n,e,i)
let L=r-H
this.positional.setup(C,L,H)
let o=this.blocks,s=t.length,a=L-3*s
o.setup(C,a,s,t)}get tag(){return h([this.positional,this.named])}get base(){return this.blocks.base}get length(){return this.positional.length+this.named.length+3*this.blocks.length}at(C){return this.positional.at(C)}realloc(C){let e=this.stack
if(C>0&&null!==e){let t=this.positional,H=this.named,i=t.base+C
for(let C=t.length+H.length-1;C>=0;C--)e.copy(C+t.base,C+i)
t.base+=C,H.base+=C,e.sp+=C}}capture(){let C=0===this.positional.length?BH:this.positional.capture(),e=0===this.named.length?TH:this.named.capture()
return{tag:this.tag,length:this.length,positional:C,named:e}}clear(){let C=this.stack,e=this.length
e>0&&null!==C&&C.pop(e)}}class kH{constructor(){this.base=0,this.length=0,this.stack=null,this._tag=null,this._references=null}empty(C,e){this.stack=C,this.base=e,this.length=0,this._tag=s,this._references=ve}setup(C,e,t){this.stack=C,this.base=e,this.length=t,0===t?(this._tag=s,this._references=ve):(this._tag=null,this._references=null)}get tag(){let C=this._tag
return C||(C=this._tag=h(this.references)),C}at(C){let e=this.base,t=this.length,H=this.stack
return C<0||C>=t?Be:H.get(C,e)}capture(){return new wH(this.tag,this.references)}prepend(C){let e=C.length
if(e>0){let t=this.base,H=this.length,i=this.stack
this.base=t-=e,this.length=H+e
for(let V=0;V<e;V++)i.set(C.at(V),V,t)
this._tag=null,this._references=null}}get references(){let C=this._references
if(!C){let e=this.stack,t=this.base,H=this.length
C=this._references=e.sliceArray(t,t+H)}return C}}class wH{constructor(C,e,t=e.length){this.tag=C,this.references=e,this.length=t}static empty(){return new wH(s,ve,0)}at(C){return this.references[C]}value(){return this.references.map(this.valueOf)}get(C){let e=this.references,t=this.length
if("length"===C)return xe.create(t)
{let H=parseInt(C,10)
return H<0||H>=t?Be:e[H]}}valueOf(C){return C.value()}}class SH{constructor(){this.base=0,this.length=0,this._references=null,this._names=ve,this._atNames=ve}empty(C,e){this.stack=C,this.base=e,this.length=0,this._references=ve,this._names=ve,this._atNames=ve}setup(C,e,t,H,i){this.stack=C,this.base=e,this.length=t,0===t?(this._references=ve,this._names=ve,this._atNames=ve):(this._references=null,i?(this._names=H,this._atNames=null):(this._names=null,this._atNames=H))}get tag(){return h(this.references)}get names(){let C=this._names
return C||(C=this._names=this._atNames.map(this.toSyntheticName)),C}get atNames(){let C=this._atNames
return C||(C=this._atNames=this._names.map(this.toAtName)),C}has(C){return-1!==this.names.indexOf(C)}get(C,e=!0){let t=this.base,H=this.stack,i=(e?this.names:this.atNames).indexOf(C)
return-1===i?Be:H.get(i,t)}capture(){return new OH(this.tag,this.names,this.references)}merge(C){let e=C.length
if(e>0){let t=this.names,H=this.length,i=this.stack,V=C.names
Object.isFrozen(t)&&0===t.length&&(t=[])
for(let n=0;n<e;n++){let e=V[n];-1===t.indexOf(e)&&(H=t.push(e),i.push(C.references[n]))}this.length=H,this._references=null,this._names=t,this._atNames=null}}get references(){let C=this._references
if(!C){let e=this.base,t=this.length,H=this.stack
C=this._references=H.sliceArray(e,e+t)}return C}toSyntheticName(C){return C.slice(1)}toAtName(C){return`@${C}`}}class OH{constructor(C,e,t){this.tag=C,this.names=e,this.references=t,this.length=e.length,this._map=null}get map(){let C=this._map
if(!C){let e=this.names,t=this.references
C=this._map=me()
for(let H=0;H<e.length;H++){C[e[H]]=t[H]}}return C}has(C){return-1!==this.names.indexOf(C)}get(C){let e=this.names,t=this.references,H=e.indexOf(C)
return-1===H?Be:t[H]}value(){let C=this.names,e=this.references,t=me()
for(let H=0;H<C.length;H++){t[C[H]]=e[H].value()}return t}}class xH{constructor(){this.internalValues=null,this.internalTag=null,this.names=ve,this.length=0,this.base=0}empty(C,e){this.stack=C,this.names=ve,this.base=e,this.length=0,this.internalTag=s,this.internalValues=ve}setup(C,e,t,H){this.stack=C,this.names=H,this.base=e,this.length=t,0===t?(this.internalTag=s,this.internalValues=ve):(this.internalTag=null,this.internalValues=null)}get values(){let C=this.internalValues
if(!C){let e=this.base,t=this.length,H=this.stack
C=this.internalValues=H.sliceArray(e,e+3*t)}return C}has(C){return-1!==this.names.indexOf(C)}get(C){let e=this.base,t=this.stack,H=this.names,i=H.indexOf(C)
if(-1===H.indexOf(C))return null
let V=t.get(3*i,e),n=t.get(3*i+1,e),r=t.get(3*i+2,e)
return null===r?null:[r,n,V]}capture(){return new AH(this.names,this.values)}}class AH{constructor(C,e){this.names=C,this.values=e,this.length=C.length}has(C){return-1!==this.names.indexOf(C)}get(C){let e=this.names.indexOf(C)
return-1===e?null:[this.values[3*e+2],this.values[3*e+1],this.values[3*e]]}}const TH=new OH(s,ve,ve),BH=new wH(s,ve)
class EH{constructor(C,e,t,H){this.runtime=C,this.elementStack=H,this.dynamicScopeStack=new fe,this.scopeStack=new fe,this.updatingOpcodeStack=new fe,this.cacheGroups=new fe,this.listBlockStack=new fe,this.s0=null,this.s1=null,this.t0=null,this.t1=null,this.v0=null,this.heap=this.program.heap,this.constants=this.program.constants,this.elementStack=H,this.scopeStack.push(e),this.dynamicScopeStack.push(t),this.args=new bH,this.inner=new iH(uH.empty(),this.heap,C.program,{debugBefore:C=>ke.debugBefore(this,C,C.type),debugAfter:(C,e)=>{ke.debugAfter(this,C,C.type,e)}})}get stack(){return this.inner.stack}set stack(C){this.inner.stack=C}set currentOpSize(C){this.inner.currentOpSize=C}get currentOpSize(){return this.inner.currentOpSize}get pc(){return this.inner.pc}set pc(C){this.inner.pc=C}get ra(){return this.inner.ra}set ra(C){this.inner.ra=C}get fp(){return this.stack.fp}set fp(C){this.stack.fp=C}get sp(){return this.stack.sp}set sp(C){this.stack.sp=C}fetch(C){this.stack.push(this[Oe[C]])}load(C){this[Oe[C]]=this.stack.pop()}fetchValue(C){return this[Oe[C]]}loadValue(C,e){this[Oe[C]]=e}pushFrame(){this.inner.pushFrame()}popFrame(){this.inner.popFrame()}goto(C){this.inner.goto(C)}call(C){this.inner.call(C)}returnTo(C){this.inner.returnTo(C)}return(){this.inner.return()}static initial(C,e,t,H,i,V){let n=C.heap.scopesizeof(V),r=eH.root(t,n),L=new EH({program:C,env:e},r,H,i)
return L.pc=L.heap.getaddr(V),L.updatingOpcodeStack.push(new ge),L}static empty(C,e,t){let H={get:()=>Be,set:()=>Be,child:()=>H},i=new EH({program:C,env:e},eH.root(Be,0),H,t)
return i.updatingOpcodeStack.push(new ge),i}static resume({scope:C,dynamicScope:e},t,H){return new EH(t,C,e,H)}get program(){return this.runtime.program}get env(){return this.runtime.env}capture(C){return{dynamicScope:this.dynamicScope(),scope:this.scope(),stack:this.stack.capture(C)}}beginCacheGroup(){this.cacheGroups.push(this.updating().tail())}commitCacheGroup(){let C=new Ct("END"),e=this.updating(),t=this.cacheGroups.pop(),H=t?e.nextNode(t):e.head(),i=e.tail(),V=p(new Ze(H,i)),n=new Xe(V,C)
e.insertBefore(n,H),e.append(new Qe(n)),e.append(C)}enter(C){let e=new ge,t=this.capture(C),H=this.elements().pushUpdatableBlock(),i=new fH(this.heap.gethandle(this.pc),t,this.runtime,H,e)
this.didEnter(i)}iterate(C,e){let t=this.stack
t.push(e),t.push(C)
let H=this.capture(2),i=this.elements().pushUpdatableBlock()
return new fH(this.heap.gethandle(this.pc),H,this.runtime,i,new ge)}enterItem(C,e){this.listBlock().map[C]=e,this.didEnter(e)}enterList(C){let e=new ge,t=this.capture(0),H=this.elements().pushBlockList(e),i=this.stack.peek().artifacts,V=this.pc+C-this.currentOpSize,n=this.heap.gethandle(V),r=new ZH(n,t,this.runtime,H,e,i)
this.listBlockStack.push(r),this.didEnter(r)}didEnter(C){this.updateWith(C),this.updatingOpcodeStack.push(C.children)}exit(){this.elements().popBlock(),this.updatingOpcodeStack.pop(),this.updating().tail().didInitializeChildren()}exitList(){this.exit(),this.listBlockStack.pop()}updateWith(C){this.updating().append(C)}listBlock(){return this.listBlockStack.current}updating(){return this.updatingOpcodeStack.current}elements(){return this.elementStack}scope(){return this.scopeStack.current}dynamicScope(){return this.dynamicScopeStack.current}pushChildScope(){this.scopeStack.push(this.scope().child())}pushDynamicScope(){let C=this.dynamicScope().child()
return this.dynamicScopeStack.push(C),C}pushRootScope(C,e){let t=eH.sized(C)
return e&&t.bindCallerScope(this.scope()),this.scopeStack.push(t),t}pushScope(C){this.scopeStack.push(C)}popScope(){this.scopeStack.pop()}popDynamicScope(){this.dynamicScopeStack.pop()}newDestroyable(C){this.elements().didAddDestroyable(C)}getSelf(){return this.scope().getSelf()}referenceForSymbol(C){return this.scope().getSymbol(C)}execute(C,e){let t
for(this.pc=this.heap.getaddr(C),e&&e(this);!(t=this.next()).done;);return t.value}next(){let C,e=this.env,t=this.program,H=this.updatingOpcodeStack,i=this.elementStack,V=this.inner.nextStatement()
return null!==V?(this.inner.evaluateOuter(V,this),C={done:!1,value:null}):(this.stack.reset(),C={done:!0,value:new yH(e,t,H.pop(),i.popBlock())}),C}bindDynamicScope(C){let e=this.dynamicScope()
for(let t=C.length-1;t>=0;t--){let H=this.constants.getString(C[t])
e.set(H,this.stack.pop())}}}class DH{constructor(C){this.vm=C}next(){return this.vm.next()}}class NH{constructor(C,e){this.position=0,this.array=C,this.keyFor=e}isEmpty(){return 0===this.array.length}next(){let C=this.position,e=this.array,t=this.keyFor
if(C>=e.length)return null
let H=e[C],i=t(H,C),V=C
return this.position++,{key:i,value:H,memo:V}}}class PH{constructor(C,e,t){this.position=0,this.keys=C,this.values=e,this.keyFor=t}isEmpty(){return 0===this.keys.length}next(){let C=this.position,e=this.keys,t=this.values,H=this.keyFor
if(C>=e.length)return null
let i=t[C],V=e[C],n=H(i,V)
return this.position++,{key:n,value:i,memo:V}}}const RH=new class{isEmpty(){return!0}next(){throw new Error("Cannot call next() on an empty iterator")}}
class FH{constructor(C,e){this.tag=C.tag,this.ref=C,this.keyFor=e}iterate(){let C=this.ref,e=this.keyFor,t=C.value()
if(Array.isArray(t))return t.length>0?new NH(t,e):RH
if(null==t)return RH
if(void 0!==t.forEach){let C=[]
return t.forEach(function(e){C.push(e)}),C.length>0?new NH(C,e):RH}if("object"==typeof t){let C=Object.keys(t)
return C.length>0?new PH(C,C.map(C=>t[C]),e):RH}throw new Error(`Don't know how to {{#each ${t}}}`)}valueReferenceFor(C){return new te(C.value)}updateValueReference(C,e){C.update(e.value)}memoReferenceFor(C){return new te(C.memo)}updateMemoReference(C,e){C.update(e.memo)}}class IH extends HH{static create(C={}){return C.document=C.document||self.document,C.appendOperations=C.appendOperations||new Tt(C.document),new IH(C)}constructor(C){super({appendOperations:C.appendOperations,updateOperations:new At(C.document||document)}),Me(this,ae(C)),this.uselessAnchor=C.document.createElement("a")}protocolForURL(C){return this.uselessAnchor.href=C,this.uselessAnchor.protocol}iterableFor(C,e){let t
if(!e)throw new Error("Must specify a key for #each")
switch(e){case"@index":t=((C,e)=>String(e))
break
case"@primitive":t=(C=>String(C))
break
default:t=(C=>C[e])}return new FH(C,t)}getOwner(){return ae(this)}setOwner(C,e){Me(C,e)}}const _H="object"==typeof document?document:null
class zH{constructor(C){this._roots=[],this._rootsIndex=0,this._initializers=[],this._initialized=!1,this._rendering=!1,this._rendered=!1,this._scheduled=!1,this._notifiers=[],this.rootName=C.rootName,this.resolver=C.resolver,de(C.loader,"Must provide a Loader for preparing templates and other metadata required for a Glimmer Application."),de(C.renderer,"Must provide a Renderer to render the templates produced by the Loader."),de(C.builder,"Must provide a Builder that is responsible to building DOM."),this.document=C.document||_H,this.loader=C.loader,this.renderer=C.renderer,this.builder=C.builder}renderComponent(C,e,t=null){let H=this._roots,i=this._self
H.push({id:this._rootsIndex++,component:C,parent:e,nextSibling:t}),i&&(i.update({roots:H}),this.scheduleRerender())}async boot(){this.initialize(),this.env=this.lookup(`environment:/${this.rootName}/main/main`),await this._render()}scheduleRerender(){!this._scheduled&&this._rendered&&(this._rendering=!0,this._scheduled=!0,setTimeout(async()=>{this._scheduled=!1,await this._rerender(),this._rendering=!1},0))}initialize(){this.initRegistry(),this.initContainer()}registerInitializer(C){this._initializers.push(C)}initRegistry(){let C=this._registry=new oe,e=new ye(this._registry,this.resolver)
C.register(`environment:/${this.rootName}/main/main`,IH),C.registerOption("helper","instantiate",!1),C.registerOption("template","instantiate",!1),C.register(`document:/${this.rootName}/main/main`,this.document),C.registerOption("document","instantiate",!1),C.registerInjection("environment","document",`document:/${this.rootName}/main/main`),C.registerInjection("component-manager","env",`environment:/${this.rootName}/main/main`)
let t=this._initializers
for(let H=0;H<t.length;H++)t[H].initialize(e)
this._initialized=!0}initContainer(){this._container=new Le(this._registry,this.resolver),this._container.defaultInjections=(C=>{let e={}
return Me(e,this),e})}async _render(){let C=this.env,e=this._self=new te({roots:this._roots}),t=new be,H=this.builder.getBuilder(C),i=await this.loader.getTemplateIterator(this,C,H,t,e)
try{C.begin(),await this.renderer.render(i),C.commit(),this._didRender()}catch(V){this._didError(V)}}async _rerender(){let C=this.env
try{C.begin(),await this.renderer.rerender(),C.commit(),this._didRender()}catch(e){this._didError(e)}}_didRender(){this._rendered=!0
let C=this._notifiers
this._notifiers=[],C.forEach(C=>C[0]())}_didError(C){let e=this._notifiers
this._notifiers=[],e.forEach(e=>e[1](C))}identify(C,e){return this.resolver.identify(C,e)}factoryFor(C,e){return this._container.factoryFor(this.identify(C,e))}lookup(C,e){return this._container.lookup(this.identify(C,e))}}class WH{constructor(){this.byName=me(),this.byHandle=me()}hasName(C){return C in this.byName}getHandle(C){return this.byName[C]}hasHandle(C){return C in this.byHandle}getByHandle(C){return this.byHandle[C]}register(C,e,t){this.byHandle[C]=t,this.byName[e]=C}}class jH extends YC{constructor(C,e){super(),this.helper=C,this.tag=e.tag,this.args=e.capture()}compute(){let C=this.helper,e=this.args
return C(e.positional.value(),e.named.value())}}var UH
function GH(C){return function(e){return Array.isArray(e)&&e[0]===C}}(function(C){C[C.Text=0]="Text",C[C.Append=1]="Append",C[C.Comment=2]="Comment",C[C.Modifier=3]="Modifier",C[C.Block=4]="Block",C[C.Component=5]="Component",C[C.OpenElement=6]="OpenElement",C[C.OpenSplattedElement=7]="OpenSplattedElement",C[C.FlushElement=8]="FlushElement",C[C.CloseElement=9]="CloseElement",C[C.StaticAttr=10]="StaticAttr",C[C.DynamicAttr=11]="DynamicAttr",C[C.AttrSplat=12]="AttrSplat",C[C.Yield=13]="Yield",C[C.Partial=14]="Partial",C[C.DynamicArg=15]="DynamicArg",C[C.StaticArg=16]="StaticArg",C[C.TrustingAttr=17]="TrustingAttr",C[C.Debugger=18]="Debugger",C[C.ClientSideStatement=19]="ClientSideStatement",C[C.Unknown=20]="Unknown",C[C.Get=21]="Get",C[C.MaybeLocal=22]="MaybeLocal",C[C.HasBlock=23]="HasBlock",C[C.HasBlockParams=24]="HasBlockParams",C[C.Undefined=25]="Undefined",C[C.Helper=26]="Helper",C[C.Concat=27]="Concat",C[C.ClientSideExpression=28]="ClientSideExpression"})(UH||(UH={}))
GH(UH.Modifier),GH(UH.FlushElement),GH(UH.Get),GH(UH.MaybeLocal)
var $H;(function(C){C[C.OpenComponentElement=0]="OpenComponentElement",C[C.DidCreateElement=1]="DidCreateElement",C[C.SetComponentAttrs=2]="SetComponentAttrs",C[C.DidRenderLayout=3]="DidRenderLayout",C[C.Debugger=4]="Debugger"})($H||($H={}))
var qH=UH
const KH="&attrs"
class JH{constructor(C=0){this.offset=C,this.names=me(),this.funcs=[]}add(C,e){this.funcs.push(e),this.names[C]=this.funcs.length-1}compile(C,e){let t=C[this.offset],H=this.names[t];(0,this.funcs[H])(C,e)}}let YH,XH
function QH(C,e,t){let H=C[1],i=C[2],V=C[3]
t.expr(i),V?t.dynamicAttr(H,V,e):t.dynamicAttr(H,null,e)}class Ci{constructor(){var C=function(C=new ei,e=new ti){return C.add("if",(C,e,t,H,i)=>{if(!C||1!==C.length)throw new Error("SYNTAX ERROR: #if requires a single argument")
i.replayableIf({args:()=>(i.expr(C[0]),i.toBoolean(),1),ifTrue(){i.invokeStaticBlock(t)},ifFalse(){H&&i.invokeStaticBlock(H)}})}),C.add("unless",(C,e,t,H,i)=>{if(!C||1!==C.length)throw new Error("SYNTAX ERROR: #unless requires a single argument")
i.replayableIf({args:()=>(i.expr(C[0]),i.toBoolean(),1),ifTrue(){H&&i.invokeStaticBlock(H)},ifFalse(){i.invokeStaticBlock(t)}})}),C.add("with",(C,e,t,H,i)=>{if(!C||1!==C.length)throw new Error("SYNTAX ERROR: #with requires a single argument")
i.replayableIf({args:()=>(i.expr(C[0]),i.dup(),i.toBoolean(),2),ifTrue(){i.invokeStaticBlock(t,1)},ifFalse(){H&&i.invokeStaticBlock(H)}})}),C.add("each",(C,e,t,H,i)=>{i.replayable({args:()=>(e&&"key"===e[0][0]?i.expr(e[1][0]):i.pushPrimitiveReference(null),i.expr(C[0]),2),body(){i.putIterator(),i.jumpUnless("ELSE"),i.pushFrame(),i.dup(Oe.fp,1),i.returnTo("ITER"),i.enterList("BODY"),i.label("ITER"),i.iterate("BREAK"),i.label("BODY"),i.invokeStaticBlock(t,2),i.pop(2),i.jump("FINALLY"),i.label("BREAK"),i.exitList(),i.popFrame(),i.jump("FINALLY"),i.label("ELSE"),H&&i.invokeStaticBlock(H)}})}),C.add("in-element",(C,e,t,H,i)=>{if(!C||1!==C.length)throw new Error("SYNTAX ERROR: #in-element requires a single argument")
i.replayableIf({args(){let t=e[0],H=e[1]
for(let C=0;C<t.length;C++){let e=t[C]
if("nextSibling"!==e&&"guid"!==e)throw new Error(`SYNTAX ERROR: #in-element does not take a \`${t[0]}\` option`)
i.expr(H[C])}return i.expr(C[0]),i.dup(),4},ifTrue(){i.pushRemoteElement(),i.invokeStaticBlock(t),i.popRemoteElement()}})}),C.add("-with-dynamic-vars",(C,e,t,H,i)=>{if(e){let C=e[0],H=e[1]
i.compileParams(H),i.pushDynamicScope(),i.bindDynamicScope(C),i.invokeStaticBlock(t),i.popDynamicScope()}else i.invokeStaticBlock(t)}),C.add("component",(C,e,t,H,i)=>{if("string"==typeof C[0]&&i.staticComponentHelper(C[0],e,t))return
let V=C[0],n=C.slice(1)
i.dynamicComponent(V,n,e,!0,t,H)}),e.add("component",(C,e,t,H)=>{let i=e&&e[0]
if("string"==typeof i&&H.staticComponentHelper(i,t,null))return!0
let V=e[0],n=e.slice(1)
return H.dynamicComponent(V,n,t,!0,null,null),!0}),{blocks:C,inlines:e}}()
let e=C.blocks,t=C.inlines
this.blocks=e,this.inlines=t}}class ei{constructor(){this.names=me(),this.funcs=[]}add(C,e){this.funcs.push(e),this.names[C]=this.funcs.length-1}addMissing(C){this.missing=C}compile(C,e,t,H,i,V){let n=this.names[C]
if(void 0===n){(0,this.missing)(C,e,t,H,i,V)}else{(0,this.funcs[n])(e,t,H,i,V)}}}class ti{constructor(){this.names=me(),this.funcs=[]}add(C,e){this.funcs.push(e),this.names[C]=this.funcs.length-1}addMissing(C){this.missing=C}compile(C,e){let t,H,i,V=C[1]
if(!Array.isArray(V))return["expr",V]
if(V[0]===qH.Helper)t=V[1],H=V[2],i=V[3]
else{if(V[0]!==qH.Unknown)return["expr",V]
t=V[1],H=i=null}let n=this.names[t]
if(void 0===n&&this.missing){let C=(0,this.missing)(t,H,i,e)
return!1===C?["expr",V]:C}if(void 0!==n){let C=(0,this.funcs[n])(t,H,i,e)
return!1===C?["expr",V]:C}return["expr",V]}}const Hi=-1
class ii{constructor(C,e){this.compiler=C,this.layout=e,this.compiled=null}get symbolTable(){return this.layout.block}compile(){if(null!==this.compiled)return this.compiled
this.compiled=Hi
let C=this.layout.block.statements
return this.compiled=this.compiler.add(C,this.layout)}}class Vi{constructor(C,e){this.compiler=C,this.parsed=e,this.compiled=null}get symbolTable(){return this.parsed.block}compile(){if(null!==this.compiled)return this.compiled
this.compiled=Hi
var C=this.parsed
let e=C.block.statements,t=C.containingLayout
return this.compiled=this.compiler.add(e,t)}}function ni(C,e,t){let H=function(){if(YH)return YH
const C=YH=new JH
C.add(qH.Text,(C,e)=>{e.text(C[1])}),C.add(qH.Comment,(C,e)=>{e.comment(C[1])}),C.add(qH.CloseElement,(C,e)=>{e.closeElement()}),C.add(qH.FlushElement,(C,e)=>{e.flushElement()}),C.add(qH.Modifier,(C,e)=>{let t=e.referrer,H=C[1],i=C[2],V=C[3],n=e.compiler.resolveModifier(H,t)
if(null===n)throw new Error(`Compile Error ${H} is not a modifier: Helpers may not be used in the element form.`)
e.modifier(n,i,V)}),C.add(qH.StaticAttr,(C,e)=>{let t=C[1],H=C[2],i=C[3]
e.staticAttr(t,i,H)}),C.add(qH.DynamicAttr,(C,e)=>{QH(C,!1,e)}),C.add(qH.TrustingAttr,(C,e)=>{QH(C,!0,e)}),C.add(qH.OpenElement,(C,e)=>{e.openPrimitiveElement(C[1])}),C.add(qH.OpenSplattedElement,(C,e)=>{e.setComponentAttrs(!0),e.putComponentOperations(),e.openPrimitiveElement(C[1])}),C.add(qH.Component,(C,e)=>{let t=C[1],H=C[2],i=C[3],V=C[4],n=e.referrer
var r=e.compiler.resolveLayoutForTag(t,n)
let L=r.handle,o=r.capabilities,s=r.compilable
if(null===L||null===o)throw new Error(`Compile Error: Cannot find component ${t}`)
{let C=[[qH.ClientSideStatement,$H.SetComponentAttrs,!0],...H,[qH.ClientSideStatement,$H.SetComponentAttrs,!1]],t=e.inlineBlock({statements:C,parameters:ve}),n=e.template(V)
s?(e.pushComponentDefinition(L),e.invokeStaticComponent(o,s,t,null,i,!1,n&&n)):(e.pushComponentDefinition(L),e.invokeComponent(o,t,null,i,!1,n&&n))}}),C.add(qH.Partial,(C,e)=>{let t=C[1],H=C[2],i=e.referrer
e.replayableIf({args:()=>(e.expr(t),e.dup(),2),ifTrue(){e.invokePartial(i,e.evalSymbols(),H),e.popScope(),e.popFrame()}})}),C.add(qH.Yield,(C,e)=>{let t=C[1],H=C[2]
e.yield(t,H)}),C.add(qH.AttrSplat,(C,e)=>{let t=C[1]
e.yield(t,[]),e.setComponentAttrs(!1)}),C.add(qH.Debugger,(C,e)=>{let t=C[1]
e.debugger(e.evalSymbols(),t)}),C.add(qH.ClientSideStatement,(C,t)=>{e.compile(C,t)}),C.add(qH.Append,(C,e)=>{let t=C[1],H=C[2]
!0!==(e.compileInline(C)||t)&&e.guardedAppend(t,H)}),C.add(qH.Block,(C,e)=>{let t=C[1],H=C[2],i=C[3],V=C[4],n=C[5],r=e.template(V),L=e.template(n),o=r&&r,s=L&&L
e.compileBlock(t,H,i,o,s)})
const e=new JH(1)
return e.add($H.OpenComponentElement,(C,e)=>{e.putComponentOperations(),e.openPrimitiveElement(C[2])}),e.add($H.DidCreateElement,(C,e)=>{e.didCreateElement(Oe.s0)}),e.add($H.SetComponentAttrs,(C,e)=>{e.setComponentAttrs(C[2])}),e.add($H.Debugger,()=>{}),e.add($H.DidRenderLayout,(C,e)=>{e.didRenderLayout(Oe.s0)}),C}()
for(let i=0;i<C.length;i++)H.compile(C[i],e)
return e.commit()}class ri{constructor(C,e,t){this.main=C,this.trustingGuardedAppend=e,this.cautiousGuardedAppend=t}static compile(C){let e=this.std(C,C=>C.main()),t=this.std(C,C=>C.stdAppend(!0)),H=this.std(C,C=>C.stdAppend(!1))
return new ri(e,t,H)}static std(C,e){return li.build(C,e)}getAppend(C){return C?this.trustingGuardedAppend:this.cautiousGuardedAppend}}class Li{constructor(C,e,t){this.macros=C,this.program=e,this.resolver=t,this.initialize()}initialize(){this.stdLib=ri.compile(this)}get constants(){return this.program.constants}compileInline(C,e){return this.macros.inlines.compile(C,e)}compileBlock(C,e,t,H,i,V){this.macros.blocks.compile(C,e,t,H,i,V)}add(C,e){return ni(C,this.builderFor(e))}commit(C,e){let t=this.program.heap,H=t.malloc()
for(let i=0;i<e.length;i++){let C=e[i]
"function"==typeof C?t.pushPlaceholder(C):t.push(C)}return t.finishMalloc(H,C),H}resolveLayoutForTag(C,e){let t=this.resolver.lookupComponentDefinition(C,e)
return null===t?{handle:null,capabilities:null,compilable:null}:this.resolveLayoutForHandle(t)}resolveLayoutForHandle(C){let e=this.resolver,t=e.getCapabilities(C),H=null
return t.dynamicLayout||(H=e.getLayout(C)),{handle:C,capabilities:t,compilable:H}}resolveModifier(C,e){return this.resolver.lookupModifier(C,e)}resolveHelper(C,e){return this.resolver.lookupHelper(C,e)}}class oi{constructor(C,e){this.compiler=C,this.layout=e,this.compiled=null
let t=e.block
this.symbolTable={hasEval:t.hasEval,symbols:t.symbols.concat([KH])}}compile(){if(null!==this.compiled)return this.compiled
let C=this.compiler,e=this.layout,t=C.builderFor(e)
t.startLabels(),t.fetch(Oe.s1),t.getComponentTagName(Oe.s0),t.primitiveReference(),t.dup(),t.load(Oe.s1),t.jumpUnless("BODY"),t.fetch(Oe.s1),t.putComponentOperations(),t.openDynamicElement(),t.didCreateElement(Oe.s0),t.flushElement(),t.label("BODY"),t.invokeStaticBlock(function(C,e){return new Vi(e,{block:{statements:C.block.statements,parameters:ve},containingLayout:C})}(e,C)),t.fetch(Oe.s1),t.jumpUnless("END"),t.closeElement(),t.label("END"),t.load(Oe.s1),t.stopLabels()
let H=t.commit()
return this.compiled=H}}class si{constructor(C){this.builder=C}static(C,e){let t=e[0],H=e[1],i=e[2],V=e[3],n=this.builder
if(null!==C){var r=n.compiler.resolveLayoutForHandle(C)
let e=r.capabilities,L=r.compilable
L?(n.pushComponentDefinition(C),n.invokeStaticComponent(e,L,null,t,H,!1,i,V)):(n.pushComponentDefinition(C),n.invokeComponent(e,null,t,H,!1,i,V))}}}class ai{constructor(C){this.buffer=C,this.typePos=0,this.size=0}encode(C,e){if(C>255)throw new Error(`Opcode type over 8-bits. Got ${C}.`)
this.buffer.push(C|e|arguments.length-2<<8),this.typePos=this.buffer.length-1
for(let t=2;t<arguments.length;t++){let C=arguments[t]
if("number"==typeof C&&C>65535)throw new Error(`Operand over 16-bits. Got ${C}.`)
this.buffer.push(C)}this.size=this.buffer.length}patch(C,e){if(-1!==this.buffer[C+1])throw new Error("Trying to patch operand in populated slot instead of a reserved slot.")
this.buffer[C+1]=e}patchWith(C,e,t){if(-1!==this.buffer[C+1])throw new Error("Trying to patch operand in populated slot instead of a reserved slot.")
this.buffer[C+1]=e,this.buffer[C+2]=t}}class Mi{constructor(){this.labels=me(),this.targets=[]}label(C,e){this.labels[C]=e}target(C,e){this.targets.push({at:C,target:e})}patch(C){let e=this.targets,t=this.labels
for(let i=0;i<e.length;i++){var H=e[i]
let V=H.at,n=t[H.target]-V
C.patch(V,n)}}}class li{constructor(C,e=0){this.size=e,this.encoder=new ai([]),this.labelsStack=new fe,this.compiler=C}static build(C,e){let t=new li(C)
return e(t),t.commit()}push(C){switch(arguments.length){case 1:return this.encoder.encode(C,0)
case 2:return this.encoder.encode(C,0,arguments[1])
case 3:return this.encoder.encode(C,0,arguments[1],arguments[2])
default:return this.encoder.encode(C,0,arguments[1],arguments[2],arguments[3])}}pushMachine(C){switch(arguments.length){case 1:return this.encoder.encode(C,1024)
case 2:return this.encoder.encode(C,1024,arguments[1])
case 3:return this.encoder.encode(C,1024,arguments[1],arguments[2])
default:return this.encoder.encode(C,1024,arguments[1],arguments[2],arguments[3])}}commit(){return this.pushMachine(24),this.compiler.commit(this.size,this.encoder.buffer)}reserve(C){this.encoder.encode(C,0,-1)}reserveWithOperand(C,e){this.encoder.encode(C,0,-1,e)}reserveMachine(C){this.encoder.encode(C,1024,-1)}main(){this.push(68,Oe.s0),this.invokePreparedComponent(!1,!1,!0)}appendHTML(){this.push(28)}appendSafeHTML(){this.push(29)}appendDocumentFragment(){this.push(30)}appendNode(){this.push(31)}appendText(){this.push(32)}beginComponentTransaction(){this.push(91)}commitComponentTransaction(){this.push(92)}pushDynamicScope(){this.push(44)}popDynamicScope(){this.push(45)}pushRemoteElement(){this.push(41)}popRemoteElement(){this.push(42)}pushRootScope(C,e){this.push(20,C,e?1:0)}pushVirtualRootScope(C){this.push(21,C)}pushChildScope(){this.push(22)}popScope(){this.push(23)}prepareArgs(C){this.push(79,C)}createComponent(C,e){let t=0|e
this.push(81,t,C)}registerComponentDestructor(C){this.push(82,C)}putComponentOperations(){this.push(83)}getComponentSelf(C){this.push(84,C)}getComponentTagName(C){this.push(85,C)}getComponentLayout(C){this.push(86,C)}setupForEval(C){this.push(87,C)}invokeComponentLayout(C){this.push(90,C)}didCreateElement(C){this.push(93,C)}didRenderLayout(C){this.push(94,C)}pushFrame(){this.pushMachine(57)}popFrame(){this.pushMachine(58)}pushSmallFrame(){this.pushMachine(59)}popSmallFrame(){this.pushMachine(60)}invokeVirtual(){this.pushMachine(49)}invokeYield(){this.push(51)}toBoolean(){this.push(63)}invokePreparedComponent(C,e,t,H=null){this.beginComponentTransaction(),this.pushDynamicScope(),this.createComponent(Oe.s0,C),H&&H(),this.registerComponentDestructor(Oe.s0),this.getComponentSelf(Oe.s0),this.pushVirtualRootScope(Oe.s0),this.setVariable(0),this.setupForEval(Oe.s0),t&&this.setNamedVariables(Oe.s0),e&&this.setBlocks(Oe.s0),this.pop(),this.invokeComponentLayout(Oe.s0),this.didRenderLayout(Oe.s0),this.popFrame(),this.popScope(),this.popDynamicScope(),this.commitComponentTransaction()}get pos(){return this.encoder.typePos}get nextPos(){return this.encoder.size}compileInline(C){return this.compiler.compileInline(C,this)}compileBlock(C,e,t,H,i){this.compiler.compileBlock(C,e,t,H,i,this)}label(C){this.labels.label(C,this.nextPos)}get labels(){return this.labelsStack.current}startLabels(){this.labelsStack.push(new Mi)}stopLabels(){this.labelsStack.pop().patch(this.encoder)}pushCurriedComponent(){this.push(74)}pushDynamicComponentInstance(){this.push(73)}openDynamicElement(){this.push(34)}flushElement(){this.push(38)}closeElement(){this.push(39)}putIterator(){this.push(66)}enterList(C){this.reserve(64),this.labels.target(this.pos,C)}exitList(){this.push(65)}iterate(C){this.reserve(67),this.labels.target(this.pos,C)}setNamedVariables(C){this.push(2,C)}setBlocks(C){this.push(3,C)}setVariable(C){this.push(4,C)}setBlock(C){this.push(5,C)}getVariable(C){this.push(6,C)}getBlock(C){this.push(8,C)}hasBlock(C){this.push(9,C)}concat(C){this.push(11,C)}load(C){this.push(18,C)}fetch(C){this.push(19,C)}dup(C=Oe.sp,e=0){return this.push(16,C,e)}pop(C=1){return this.push(17,C)}returnTo(C){this.reserveMachine(25),this.labels.target(this.pos,C)}primitiveReference(){this.push(14)}reifyU32(){this.push(15)}enter(C){this.push(61,C)}exit(){this.push(62)}return(){this.pushMachine(24)}jump(C){this.reserveMachine(52),this.labels.target(this.pos,C)}jumpIf(C){this.reserve(53),this.labels.target(this.pos,C)}jumpUnless(C){this.reserve(54),this.labels.target(this.pos,C)}jumpEq(C,e){this.reserveWithOperand(55,C),this.labels.target(this.pos,e)}assertSame(){this.push(56)}pushEmptyArgs(){this.push(77)}switch(C,e){let t=[],H=0
e(function(C,e){t.push({match:C,callback:e,label:`CLAUSE${H++}`})}),this.enter(2),this.assertSame(),this.reifyU32(),this.startLabels(),t.slice(0,-1).forEach(C=>this.jumpEq(C.match,C.label))
for(let i=t.length-1;i>=0;i--){let C=t[i]
this.label(C.label),this.pop(2),C.callback(),0!==i&&this.jump("END")}this.label("END"),this.stopLabels(),this.exit()}stdAppend(C){this.switch(this.contentType(),e=>{e(1,()=>{C?(this.assertSame(),this.appendHTML()):this.appendText()}),e(0,()=>{this.pushCurriedComponent(),this.pushDynamicComponentInstance(),this.invokeBareComponent()}),e(3,()=>{this.assertSame(),this.appendSafeHTML()}),e(4,()=>{this.assertSame(),this.appendDocumentFragment()}),e(5,()=>{this.assertSame(),this.appendNode()})})}populateLayout(C){this.push(89,C)}invokeBareComponent(){this.fetch(Oe.s0),this.dup(Oe.sp,1),this.load(Oe.s0),this.pushFrame(),this.pushEmptyArgs(),this.prepareArgs(Oe.s0),this.invokePreparedComponent(!1,!1,!0,()=>{this.getComponentLayout(Oe.s0),this.populateLayout(Oe.s0)}),this.load(Oe.s0)}isComponent(){this.push(69)}contentType(){this.push(70)}pushBlockScope(){this.push(47)}}class di extends li{constructor(C,e){super(C,e?e.block.symbols.length:0),this.containingLayout=e,this.component=new si(this),this.expressionCompiler=function(){if(XH)return XH
const C=XH=new JH
return C.add(qH.Unknown,(C,e)=>{let t=e.compiler,H=e.referrer,i=e.containingLayout.asPartial,V=C[1],n=t.resolveHelper(V,H)
null!==n?e.helper(n,null,null):i?e.resolveMaybeLocal(V):(e.getVariable(0),e.getProperty(V))}),C.add(qH.Concat,(C,e)=>{let t=C[1]
for(let H=0;H<t.length;H++)e.expr(t[H])
e.concat(t.length)}),C.add(qH.Helper,(C,e)=>{let t=e.compiler,H=e.referrer,i=C[1],V=C[2],n=C[3]
if("component"===i){let C=V[0],t=V.slice(1)
return void e.curryComponent(C,t,n,!0)}let r=t.resolveHelper(i,H)
if(null===r)throw new Error(`Compile Error: ${i} is not a helper`)
e.helper(r,V,n)}),C.add(qH.Get,(C,e)=>{let t=C[1],H=C[2]
e.getVariable(t)
for(let i=0;i<H.length;i++)e.getProperty(H[i])}),C.add(qH.MaybeLocal,(C,e)=>{let t=C[1]
if(e.containingLayout.asPartial){let C=t[0]
t=t.slice(1),e.resolveMaybeLocal(C)}else e.getVariable(0)
for(let H=0;H<t.length;H++)e.getProperty(t[H])}),C.add(qH.Undefined,(C,e)=>e.pushPrimitiveReference(void 0)),C.add(qH.HasBlock,(C,e)=>{e.hasBlock(C[1])}),C.add(qH.HasBlockParams,(C,e)=>{e.hasBlockParams(C[1])}),C}(),this.isComponentAttrs=!1,this.constants=C.constants,this.stdLib=C.stdLib}get referrer(){return this.containingLayout&&this.containingLayout.referrer}setComponentAttrs(C){this.isComponentAttrs=C}expr(C){Array.isArray(C)?this.expressionCompiler.compile(C,this):this.pushPrimitiveReference(C)}pushArgs(C,e){let t=this.constants.stringArray(C)
this.push(76,t,e)}pushYieldableBlock(C){this.pushSymbolTable(C&&C.symbolTable),this.pushBlockScope(),this.pushBlock(C)}curryComponent(C,e,t,H){let i=this.containingLayout.referrer
this.pushFrame(),this.compileArgs(e,t,null,H),this.push(80),this.expr(C),this.push(71,this.constants.serializable(i)),this.popFrame(),this.fetch(Oe.v0)}pushSymbolTable(C){if(C){let e=this.constants.serializable(C)
this.push(48,e)}else this.primitive(null)}invokeComponent(C,e,t,H,i,V,n=null,r){this.fetch(Oe.s0),this.dup(Oe.sp,1),this.load(Oe.s0),this.pushFrame()
let L=!!(V||n||e),o=!0===C||C.prepareArgs||!(!H||0===H[0].length),s={main:V,else:n,attrs:e}
this.compileArgs(t,H,s,i),this.prepareArgs(Oe.s0),this.invokePreparedComponent(null!==V,L,o,()=>{r?(this.pushSymbolTable(r.symbolTable),this.pushLayout(r),this.resolveLayout()):this.getComponentLayout(Oe.s0),this.populateLayout(Oe.s0)}),this.load(Oe.s0)}invokeStaticComponent(C,e,t,H,i,V,n,r=null){let L=e.symbolTable
if(L.hasEval||C.prepareArgs)return void this.invokeComponent(C,t,H,i,V,n,r,e)
this.fetch(Oe.s0),this.dup(Oe.sp,1),this.load(Oe.s0)
let o=L.symbols
C.createArgs&&(this.pushFrame(),this.compileArgs(null,i,null,V)),this.beginComponentTransaction(),C.dynamicScope&&this.pushDynamicScope(),C.createInstance&&this.createComponent(Oe.s0,null!==n),C.createArgs&&this.popFrame(),this.pushFrame(),this.registerComponentDestructor(Oe.s0)
let s=[]
this.getComponentSelf(Oe.s0),s.push({symbol:0,isBlock:!1})
for(let M=0;M<o.length;M++){let C=o[M]
switch(C.charAt(0)){case"&":let e=null
if("&default"===C)e=n
else if("&inverse"===C)e=r
else{if(C!==KH)throw le()
e=t}e?(this.pushYieldableBlock(e),s.push({symbol:M+1,isBlock:!0})):(this.pushYieldableBlock(null),s.push({symbol:M+1,isBlock:!0}))
break
case"@":if(!i)break
let H=i[0],L=i[1],o=C
V&&(o=C.slice(1))
let a=H.indexOf(o);-1!==a&&(this.expr(L[a]),s.push({symbol:M+1,isBlock:!1}))}}this.pushRootScope(o.length+1,!!(n||r||t))
for(let M=s.length-1;M>=0;M--){var a=s[M]
let C=a.symbol
a.isBlock?this.setBlock(C):this.setVariable(C)}this.invokeStatic(e),C.createInstance&&this.didRenderLayout(Oe.s0),this.popFrame(),this.popScope(),C.dynamicScope&&this.popDynamicScope(),this.commitComponentTransaction(),this.load(Oe.s0)}dynamicComponent(C,e,t,H,i,V=null){this.replayable({args:()=>(this.expr(C),this.dup(),2),body:()=>{this.jumpUnless("ELSE"),this.resolveDynamicComponent(this.containingLayout.referrer),this.pushDynamicComponentInstance(),this.invokeComponent(!0,null,e,t,H,i,V),this.label("ELSE")}})}yield(C,e){this.compileArgs(e,null,null,!1),this.getBlock(C),this.resolveBlock(),this.invokeYield(),this.popScope(),this.popFrame()}guardedAppend(C,e){this.pushFrame(),this.expr(C),this.pushMachine(50,this.stdLib.getAppend(e)),this.popFrame()}invokeStaticBlock(C,e=0){let t=C.symbolTable.parameters,H=t.length,i=Math.min(e,H)
if(this.pushFrame(),i){this.pushChildScope()
for(let C=0;C<i;C++)this.dup(Oe.fp,e-C),this.setVariable(t[C])}this.pushBlock(C),this.resolveBlock(),this.invokeVirtual(),i&&this.popScope(),this.popFrame()}string(C){return this.constants.string(C)}names(C){let e=[]
for(let t=0;t<C.length;t++){let H=C[t]
e[t]=this.constants.string(H)}return this.constants.array(e)}symbols(C){return this.constants.array(C)}primitive(C){let e,t=0
switch(typeof C){case"number":C%1==0?C>-1?e=C:(e=this.constants.number(C),t=4):(e=this.constants.number(C),t=1)
break
case"string":e=this.string(C),t=2
break
case"boolean":e=0|C,t=3
break
case"object":e=2,t=3
break
case"undefined":e=3,t=3
break
default:throw new Error("Invalid primitive passed to pushPrimitive")}let H=this.sizeImmediate(e<<3|t,e)
this.push(13,H)}sizeImmediate(C,e){return C>=65535||C<0?this.constants.number(e)<<3|5:C}pushPrimitiveReference(C){this.primitive(C),this.primitiveReference()}pushComponentDefinition(C){this.push(72,this.constants.handle(C))}resolveDynamicComponent(C){this.push(75,this.constants.serializable(C))}staticComponentHelper(C,e,t){var H=this.compiler.resolveLayoutForTag(C,this.referrer)
let i=H.handle,V=H.capabilities,n=H.compilable
if(null!==i&&null!==V&&n){if(e)for(let C=0;C<e.length;C+=2)e[C][0]=`@${e[C][0]}`
return this.pushComponentDefinition(i),this.invokeStaticComponent(V,n,null,null,e,!1,t&&t),!0}return!1}invokePartial(C,e,t){let H=this.constants.serializable(C),i=this.constants.stringArray(e),V=this.constants.array(t)
this.push(95,H,i,V)}resolveMaybeLocal(C){this.push(96,this.string(C))}debugger(C,e){this.push(97,this.constants.stringArray(C),this.constants.array(e))}text(C){this.push(26,this.constants.string(C))}openPrimitiveElement(C){this.push(33,this.constants.string(C))}modifier(C,e,t){this.pushFrame(),this.compileArgs(e,t,null,!0),this.push(40,this.constants.handle(C)),this.popFrame()}comment(C){let e=this.constants.string(C)
this.push(27,e)}dynamicAttr(C,e,t){let H=this.constants.string(C),i=e?this.constants.string(e):0
this.isComponentAttrs?this.push(37,H,!0===t?1:0,i):this.push(36,H,!0===t?1:0,i)}staticAttr(C,e,t){let H=this.constants.string(C),i=e?this.constants.string(e):0
if(this.isComponentAttrs)this.pushPrimitiveReference(t),this.push(37,H,1,i)
else{let C=this.constants.string(t)
this.push(35,H,C,i)}}hasBlockParams(C){this.getBlock(C),this.resolveBlock(),this.push(10)}getProperty(C){this.push(7,this.string(C))}helper(C,e,t){this.pushFrame(),this.compileArgs(e,t,null,!0),this.push(1,this.constants.handle(C)),this.popFrame(),this.fetch(Oe.v0)}bindDynamicScope(C){this.push(43,this.names(C))}replayable({args:C,body:e}){this.startLabels(),this.pushFrame(),this.returnTo("ENDINITIAL")
let t=C()
this.enter(t),e(),this.label("FINALLY"),this.exit(),this.return(),this.label("ENDINITIAL"),this.popFrame(),this.stopLabels()}replayableIf({args:C,ifTrue:e,ifFalse:t}){this.replayable({args:C,body:()=>{this.jumpUnless("ELSE"),e(),this.jump("FINALLY"),this.label("ELSE"),t&&t()}})}inlineBlock(C){return new Vi(this.compiler,{block:C,containingLayout:this.containingLayout})}evalSymbols(){let C=this.containingLayout.block
return C.hasEval?C.symbols:null}compileParams(C){if(!C)return 0
for(let e=0;e<C.length;e++)this.expr(C[e])
return C.length}compileArgs(C,e,t,H){t&&(this.pushYieldableBlock(t.main),this.pushYieldableBlock(t.else),this.pushYieldableBlock(t.attrs))
let i=this.compileParams(C)<<4
H&&(i|=8),t&&(i|=7)
let V=ve
if(e){V=e[0]
let C=e[1]
for(let e=0;e<C.length;e++)this.expr(C[e])}this.pushArgs(V,i)}template(C){return C?this.inlineBlock(C):null}}class ci extends di{pushBlock(C){C?this.pushOther(C):this.primitive(null)}resolveBlock(){this.push(46)}pushLayout(C){C?this.pushOther(C):this.primitive(null)}resolveLayout(){this.push(46)}invokeStatic(C){this.pushOther(C),this.push(46),this.pushMachine(49)}pushOther(C){this.push(12,this.other(C))}other(C){return this.constants.other(C)}}const ui={},hi=0,pi=Object.freeze([])
class mi{constructor(){this.strings=[],this.arrays=[pi],this.tables=[],this.handles=[],this.resolved=[],this.numbers=[]}string(C){let e=this.strings.indexOf(C)
return e>-1?e:this.strings.push(C)-1}stringArray(C){let e=new Array(C.length)
for(let t=0;t<C.length;t++)e[t]=this.string(C[t])
return this.array(e)}array(C){if(0===C.length)return hi
let e=this.arrays.indexOf(C)
return e>-1?e:this.arrays.push(C)-1}handle(C){let e=this.handles.indexOf(C)
return e>-1?e:(this.resolved.push(ui),this.handles.push(C)-1)}serializable(C){let e=JSON.stringify(C),t=this.strings.indexOf(e)
return t>-1?t:this.strings.push(e)-1}number(C){let e=this.numbers.indexOf(C)
return e>-1?e:this.numbers.push(C)-1}toPool(){return{strings:this.strings,arrays:this.arrays,handles:this.handles,numbers:this.numbers}}}class fi extends mi{constructor(C,e){super(),this.resolver=C,e&&(this.strings=e.strings,this.arrays=e.arrays,this.handles=e.handles,this.resolved=this.handles.map(()=>ui),this.numbers=e.numbers)}getNumber(C){return this.numbers[C]}getString(C){return this.strings[C]}getStringArray(C){let e=this.getArray(C),t=new Array(e.length)
for(let H=0;H<e.length;H++){let C=e[H]
t[H]=this.getString(C)}return t}getArray(C){return this.arrays[C]}resolveHandle(C){let e=this.resolved[C]
if(e===ui){let t=this.handles[C]
e=this.resolved[C]=this.resolver.resolve(t)}return e}getSerializable(C){return JSON.parse(this.strings[C])}}class gi extends fi{constructor(){super(...arguments),this.others=[],this.serializables=[]}serializable(C){let e=this.serializables.indexOf(C)
return e>-1?e:this.serializables.push(C)-1}getSerializable(C){return this.serializables[C]}getOther(C){return this.others[C-1]}other(C){return this.others.push(C)}}class Zi{constructor(C){this.heap=C,this.offset=0}get size(){return 1+((768&this.heap.getbyaddr(this.offset))>>8)}get isMachine(){return 1024&this.heap.getbyaddr(this.offset)}get type(){return 255&this.heap.getbyaddr(this.offset)}get op1(){return this.heap.getbyaddr(this.offset+1)}get op2(){return this.heap.getbyaddr(this.offset+2)}get op3(){return this.heap.getbyaddr(this.offset+3)}}function vi(C,e,t){return C|e<<16|t<<30}function yi(C,e){return C|e<<30}const bi=1048576
class ki{constructor(C){if(this.placeholders=[],this.offset=0,this.handle=0,this.capacity=bi,C){let e=C.buffer,t=C.table,H=C.handle
this.heap=new Uint16Array(e),this.table=t,this.offset=this.heap.length,this.handle=H,this.capacity=0}else this.heap=new Uint16Array(bi),this.table=[]}push(C){this.sizeCheck(),this.heap[this.offset++]=C}sizeCheck(){if(0===this.capacity){let C=Oi(this.heap,0,this.offset)
this.heap=new Uint16Array(C.length+bi),this.heap.set(C,0),this.capacity=bi}this.capacity--}getbyaddr(C){return this.heap[C]}setbyaddr(C,e){this.heap[C]=e}malloc(){this.table.push(this.offset,0)
let C=this.handle
return this.handle+=2,C}finishMalloc(C,e){let t=this.table[C],H=vi(this.offset-t,e,0)
this.table[C+1]=H}size(){return this.offset}getaddr(C){return this.table[C]}gethandle(C){this.table.push(C,vi(0,0,3))
let e=this.handle
return this.handle+=2,e}sizeof(C){return-1}scopesizeof(C){return(1073676288&this.table[C+1])>>16}free(C){let e=this.table[C+1]
this.table[C+1]=yi(e,1)}compact(){let C=0,e=this.table,t=this.table.length,H=this.heap
for(let i=0;i<t;i+=2){let t=e[i],V=e[i+1],n=65535&V,r=-1&V
if(2!==r)if(1===r)e[i+1]=yi(V,2),C+=n
else if(0===r){for(let e=t;e<=i+n;e++)H[e-C]=H[e]
e[i]=t-C}else 3===r&&(e[i]=t-C)}this.offset=this.offset-C}pushPlaceholder(C){this.sizeCheck()
let e=this.offset++
this.heap[e]=65535,this.placeholders.push([e,C])}patchPlaceholders(){let C=this.placeholders
for(let t=0;t<C.length;t++){var e=C[t]
let H=e[0],i=e[1]
this.setbyaddr(H,i())}}capture(C=this.offset){this.patchPlaceholders()
let e=Oi(this.heap,0,C).buffer
return{handle:this.handle,table:this.table,buffer:e}}}class wi{constructor(C=new mi,e=new ki){this.constants=C,this.heap=e,this._opcode=new Zi(this.heap)}opcode(C){return this._opcode.offset=C,this._opcode}}class Si extends wi{}function Oi(C,e,t){if(void 0!==C.slice)return C.slice(e,t)
let H=new Uint16Array(t)
for(;e<t;e++)H[e]=C[e]
return H}class xi extends Li{constructor(C,e,t){let H=new gi(e)
super(t,new Si(H),C)}builderFor(C){return new ci(this,C)}}let Ai=0
class Ti{constructor(C,e){this.compiler=C,this.parsedLayout=e,this.layout=null,this.partial=null,this.wrappedLayout=null
let t=e.block
this.symbols=t.symbols,this.hasEval=t.hasEval,this.referrer=e.referrer,this.id=e.id||`client-${Ai++}`}asLayout(){return this.layout?this.layout:this.layout=new ii(this.compiler,Object.assign({},this.parsedLayout,{asPartial:!1}))}asPartial(){return this.partial?this.partial:this.layout=new ii(this.compiler,Object.assign({},this.parsedLayout,{asPartial:!0}))}asWrappedLayout(){return this.wrappedLayout?this.wrappedLayout:this.wrappedLayout=new oi(this.compiler,Object.assign({},this.parsedLayout,{asPartial:!1}))}}class Bi{constructor(C){this.owner=C,this.handleLookup=[],this.cache={component:new WH,template:new WH,compiledTemplate:new WH,helper:new WH,manager:new WH,modifier:new WH}}lookup(C,e,t){return this.cache[C].hasName(e)?this.cache[C].getHandle(e):null}register(C,e,t){let H=this.cache[C],i=this.handleLookup.length
return this.handleLookup.push(H),this.cache[C].register(i,e,t),i}lookupModifier(C,e){let t=this.lookup("modifier",C)
if(null===t)throw new Error(`Modifier for ${C} not found.`)
return t}compileTemplate(C,e){if(!this.cache.compiledTemplate.hasName(C)){let t=this.resolve(e),H=JSON.parse(t.block),i=new ii(this.compiler,{block:H,referrer:t.meta,asPartial:!1}),V={handle:i.compile(),symbolTable:i.symbolTable}
return this.register("compiledTemplate",C,V),V}let t=this.lookup("compiledTemplate",C)
return this.resolve(t)}registerHelper(C,e){return this.register("helper",C,(C,t)=>new jH(e,t))}registerInternalHelper(C,e){this.register("helper",C,e)}registerComponent(C,e,t,H){let i=this.registerTemplate(e,H),V=this.managerFor(i.meta.managerId),n=new Y(C,V,t,i.handle)
return this.register("component",C,n)}lookupComponentHandle(C,e){return this.cache.component.hasName(C)||this.lookupComponentDefinition(C,e),this.lookup("component",C,e)}managerFor(C="main"){let e
if(this.cache.manager.hasName(C)){let e=this.cache.manager.getHandle(C)
return this.cache.manager.getByHandle(e)}{let t=this.owner.rootName
if(!(e=this.owner.lookup(`component-manager:/${t}/component-managers/${C}`)))throw new Error(`No component manager found for ID ${C}.`)
return this.register("manager",C,e),e}}registerTemplate(C,e){return{name:C,handle:this.register("template",C,e),meta:e.meta}}lookupComponentDefinition(C,e){let t
if(this.cache.component.hasName(C))t=this.lookup("component",C,e)
else{let H=function(C,e){if(null==C)throw new Error(e)
return C}(this.identifyComponent(C,e),`Could not find the component '${C}'`),i=this.owner.lookup("template",H),V=this.owner.identify("component",H),n=null
void 0!==V&&(n=this.owner.factoryFor(V)),t=this.registerComponent(C,H,n,i)}return this.resolve(t)}lookupHelper(C,e){if(!this.cache.helper.hasName(C)){let t=this.owner,H=`helper:${C}`,i=e.specifier,V=t.identify(H,i)
if(void 0===V)return null
let n=this.owner.lookup(V,e.specifier)
return this.registerHelper(C,n)}return this.lookup("helper",C,e)}lookupPartial(C,e){throw new Error("Partials are not available in Glimmer applications.")}resolve(C){return this.handleLookup[C].getByHandle(C)}identifyComponent(C,e){let t=this.owner,H=`template:${C}`,i=e.specifier,V=t.identify(H,i)
if(void 0===V&&t.identify(`component:${C}`,i))throw new Error(`The component '${C}' is missing a template. All components must have a template. Make sure there is a template.hbs in the component directory.`)
return V}}var Ei={id:"j7SGa6Pm",block:'{"symbols":["root"],"statements":[[4,"each",[[22,["roots"]]],[["key"],["id"]],{"statements":[[4,"in-element",[[21,1,["parent"]]],[["guid","nextSibling"],["%cursor:0%",[21,1,["nextSibling"]]]],{"statements":[[1,[26,"component",[[21,1,["component"]]],null],false]],"parameters":[]},null]],"parameters":[1]},null]],"hasEval":false}',meta:{specifier:"template:/-application/application/src/templates/main"}}
function Di(C,e){let t=C.getSelf(),H=e.capture(),i=H.positional.at(0).value()
return"function"!=typeof i&&function(C,e){let t=function(C){let e,t,H=""
if(null==C)return H
"parent"in C&&"property"in C?(e=C.parent.value(),t=C.property):"_parentValue"in C&&"_propertyKey"in C&&(e=C._parentValue,t=C._propertyKey)
void 0!==t&&(H+=`('${t}' on ${function(C){let e=typeof C
if(null==C)return e
if("number"===e||"boolean"===e)return C.toString()
if(C.debugName)return C.debugName
try{return JSON.stringify(C)}catch(t){}return C.toString()}(e)}) `)
return H}(e)
throw new Error(`You tried to create an action with the {{action}} helper, but the first argument ${t}was ${typeof C} instead of a function.`)}(i,H.positional.at(0)),new te(function(...C){let e=H.positional.value()
e.shift(),e.push(...C),i.apply(t&&t.value(),e)})}function Ni(C){return C[0]?C[1]:C[2]}class Pi{constructor(C){this.resolver=C}getComponentDefinition(C){let e=this.resolver.resolve(C)
return de(!!e,`Couldn't find a template for ${C}`),e}getCapabilities(C){let e=this.getComponentDefinition(C),t=e.manager,H=e.state
return t.getCapabilities(H)}getLayout(C){let e=this.getComponentDefinition(C),t=e.manager.getLayout(e,this.resolver)
return{compile:()=>t.handle,symbolTable:t.symbolTable}}lookupHelper(C,e){return this.resolver.lookupHelper(C,e)}lookupModifier(C,e){return this.resolver.lookupModifier(C,e)}lookupComponentDefinition(C,e){return this.resolver.lookupComponentHandle(C,e)}lookupPartial(C,e){return this.resolver.lookupPartial(C,e)}}class Ri{constructor(C){this.resolver=C}async getTemplateIterator(C,e,t,H,i){let V=new Bi(C),n=new Pi(V),r=new Ci,L=new xi(n,V,r),o=L.program
V.compiler=L,V.registerTemplate("main",Ei),V.registerInternalHelper("action",Di),V.registerHelper("if",Ni)
let s=function({id:C,meta:e,block:t}){let H,i=C||`client-${Ai++}`
return{id:i,meta:e,create:(C,V)=>{let n=V?ue({},V,e):e
return H||(H=JSON.parse(t)),new Ti(C,{id:i,block:H,referrer:n})}}}(Ei).create(L)
return Promise.resolve(function(C,e,t,H,i,V){let n=EH.initial(C,e,t,H,i,V)
return new DH(n)}(o,e,i,H,t,s.asLayout().compile()))}}class Fi{constructor({element:C,nextSibling:e=null}){this.cursor={element:C,nextSibling:e}}getBuilder(C){return function(C,e){return rH.forInitialRender(C,e)}(C,this.cursor)}}class Ii{render(C){let e
do{e=C.next()}while(!e.done)
this.result=e.value}rerender(){if(!this.result)throw new Error("Cannot re-render before initial render has completed")
this.result.rerender()}}function _i(C){return void 0!==C.rootName&&void 0!==C.collection&&void 0!==C.name&&void 0!==C.type}function zi(C){let e=C.type,t=function(C){let e=[]
C.rootName&&e.push(C.rootName)
C.collection&&e.push(C.collection)
C.namespace&&e.push(C.namespace)
C.name&&e.push(C.name)
if(e.length>0){let t=e.join("/")
return _i(C)&&(t="/"+t),t}}(C)
return t?e+":"+t:e}function Wi(C){let e={}
if(C.indexOf(":")>-1){let t,H=C.split(":"),i=H[0],V=H[1]
e.type=i,0===V.indexOf("/")?(t=V.substr(1).split("/"),V.substr(1).startsWith("@")?e.rootName=t.shift()+"/"+t.shift():e.rootName=t.shift(),e.collection=t.shift()):t=V.split("/"),t.length>0&&(e.name=t.pop(),t.length>0&&(e.namespace=t.join("/")))}else e.type=C
return e}function ji(C,e){if(!e)throw new Error("Assertion Failed: "+C)}class Ui{constructor(C,e){this.config=C,this.registry=e}identify(C,e){if(function(C){let e=C.split(":"),t=e[0],H=e[1]
return!!(t&&H&&0===H.indexOf("/")&&H.split("/").length>3)}(C))return C
let t,H=Wi(C)
if(e){let C=Wi(e)
if(_i(C)){ji("Specifier must not include a rootName, collection, or namespace when combined with an absolute referrer",void 0===H.rootName&&void 0===H.collection&&void 0===H.namespace),H.rootName=C.rootName,H.collection=C.collection
let e=this._definitiveCollection(H.type)
if(!H.name)return H.namespace=C.namespace,H.name=C.name,this._serializeAndVerify(H)
if(H.namespace=C.namespace?C.namespace+"/"+C.name:C.name,function(C){let e=C.namespace,t=C.collection,H=e.lastIndexOf("/-")
if(H>-1){H+=2
let C=e.indexOf("/",H)
t=e.slice(H,C>-1?C:void 0)}return t}(H)===e&&(t=this._serializeAndVerify(H)))return t
if(e&&(H.namespace+="/-"+e,t=this._serializeAndVerify(H)))return t
H.rootName=H.collection=H.namespace=void 0}else ji('Referrer must either be "absolute" or include a `type` to determine the associated type',C.type),H.collection=this._definitiveCollection(C.type),H.namespace||(H.namespace=C.rootName),ji(`'${C.type}' does not have a definitive collection`,H.collection)}if(H.collection||(H.collection=this._definitiveCollection(H.type),ji(`'${H.type}' does not have a definitive collection`,H.collection)),!H.rootName){if(H.rootName=this.config.app.rootName||"app",t=this._serializeAndVerify(H))return t
H.namespace?(H.rootName=H.namespace,H.namespace=void 0):(H.rootName=H.name,H.name="main")}return(t=this._serializeAndVerify(H))?t:void 0}retrieve(C){return this.registry.get(C)}resolve(C,e){let t=this.identify(C,e)
if(t)return this.retrieve(t)}_definitiveCollection(C){let e=this.config.types[C]
return ji(`'${C}' is not a recognized type`,e),e.definitiveCollection}_serializeAndVerify(C){let e=zi(C)
if(this.registry.has(e))return e}}class Gi{constructor(C={}){this._entries=C}has(C){return C in this._entries}get(C){return this._entries[C]}}class $i extends K{constructor(){super(...arguments),this.expanded="false"}click(C){C.preventDefault(),"false"===this.expanded?this.expanded="true":this.expanded="false"}keyDown(C){if(13===C.keyCode)"false"===this.expanded?(this.expanded="true",setTimeout(function(){C.target.nextElementSibling.querySelector('*[role="menuitem"]').focus()},100)):this.expanded="false"
else if(27===C.keyCode)"true"!==C.target.getAttribute("aria-haspopup")&&C.target.parentElement.parentElement.previousElementSibling.focus(),this.expanded="false"
else if(39===C.keyCode){let e=C.target.parentElement.nextElementSibling
for(;e&&("separator"===e.getAttribute("role")||"true"===e.querySelector('*[role="menuitem"]').getAttribute("aria-disabled"));)e=e.nextElementSibling
e&&e.querySelector('*[role="menuitem"]').focus()}else if(37===C.keyCode){let e=C.target.parentElement.previousElementSibling
for(;e&&("separator"===e.getAttribute("role")||"true"===e.querySelector('*[role="menuitem"]').getAttribute("aria-disabled"));)e=e.previousElementSibling
e&&e.querySelector('*[role="menuitem"]').focus()}}mouseOver(){this.expanded="true"}mouseOut(){this.expanded="false"}}(function(C,e,t,H){var i,V=arguments.length,n=V<3?e:null===H?H=Object.getOwnPropertyDescriptor(e,t):H
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(C,e,t,H)
else for(var r=C.length-1;r>=0;r--)(i=C[r])&&(n=(V<3?i(n):V>3?i(e,t,n):i(e,t))||n)
V>3&&n&&Object.defineProperty(e,t,n)})([R],$i.prototype,"expanded",void 0)
class qi extends K{get tabindex(){return void 0!==this.args.tabindex?this.args.tabindex:-1}noAction(C){C.preventDefault()}}(function(C,e,t,H){var i,V=arguments.length,n=V<3?e:null===H?H=Object.getOwnPropertyDescriptor(e,t):H
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(C,e,t,H)
else for(var r=C.length-1;r>=0;r--)(i=C[r])&&(n=(V<3?i(n):V>3?i(e,t,n):i(e,t))||n)
V>3&&n&&Object.defineProperty(e,t,n)})([R],qi.prototype,"tabindex",null)
function Ki(C){return function C(e){if(void 0!==e){if(null===e)return null
if(Array.isArray(e))return e.slice()
if("object"==typeof e){let t={}
return Object.keys(e).forEach(function(H){t[H]=C(e[H])}),t}return e}}(C[0])}var Ji=function(C,e,t,H){var i,V=arguments.length,n=V<3?e:null===H?H=Object.getOwnPropertyDescriptor(e,t):H
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(C,e,t,H)
else for(var r=C.length-1;r>=0;r--)(i=C[r])&&(n=(V<3?i(n):V>3?i(e,t,n):i(e,t))||n)
return V>3&&n&&Object.defineProperty(e,t,n),n}
class Yi extends K{constructor(){super(...arguments),this.bodyText=null,this.selectedAnnotation=null,this.selectedId=null,this.annotations=null,this.nextAnnotationId=0}didUpdate(){if(this.annotations!==this.args.annotations)if(this.annotations=this.args.annotations,this.annotations&&this.annotations.length>0)if(this.selectedId){for(let C=0;C<this.annotations.length;C++)if(this.annotations[C].attrs.id===this.selectedId){this.bodyText=this.annotations[C]
break}}else this.bodyText=this.annotations[0],this.selectedId=this.annotations[0].attrs.id
else this.bodyText=null,this.selectedId=null}selectAnnotation(C){C.preventDefault(),this.selectedId=C.target.value
for(let e=0;e<this.annotations.length;e++)if(this.annotations[e].attrs.id===this.selectedId){this.bodyText=this.annotations[e]
break}}updateAnnotationText(C){for(let e=0;e<this.annotations.length;e++)if(this.annotations[e].attrs.id===C.attrs.id){if(C.attrs.id!==this.selectedId){let t=this.annotations.slice()
t[e]=C,this.selectedId=C.attrs.id,this.args.update(t)
break}this.annotations[e]=C}}deleteAnnotation(){for(let C=0;C<this.annotations.length;C++)if(this.annotations[C].attrs.id===this.selectedAnnotation.attrs.id){let e=this.annotations.slice()
e.splice(C,1),this.args.update(e)
break}}addAnnotation(){let C=this.annotations.slice(),e=Ki([this.args.default])
this.nextAnnotationId++,e.attrs.id="new"+this.nextAnnotationId,C.push(e),this.selectedId="new"+this.nextAnnotationId,this.args.update(C)}}Ji([R],Yi.prototype,"bodyText",void 0),Ji([R],Yi.prototype,"selectedAnnotation",void 0),Ji([R],Yi.prototype,"selectedId",void 0),Ji([R],Yi.prototype,"annotations",void 0)
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(C,e,t,H)
else for(var r=C.length-1;r>=0;r--)(i=C[r])&&(n=(V<3?i(n):V>3?i(e,t,n):i(e,t))||n)
return V>3&&n&&Object.defineProperty(e,t,n),n}
class CV extends K{get icon(){return Xi["mdi"+this.args.name]}get class(){return void 0!==this.args.class?"mdi-icon "+this.args.class:"mdi-icon"}}Qi([R],CV.prototype,"icon",null),Qi([R],CV.prototype,"class",null)
function eV(C){let e=C[0],t=C[1].split(".")
for(;e&&t.length>0;)e=e[t[0]],t=t.slice(1)
return e}function tV(C){let e=C[0],t=C[1].split("."),H=e
for(;t.length>0;)t.length>1?(H[t[0]]||(H[t[0]]={}),H=H[t[0]]):H[t[0]]=C[2],t.splice(0,1)
return e}let HV=0
function iV(C){return C._guid||function(C){return C._guid=++HV}(C)}Object.freeze([])
function VV(C){return C&&C.__esModule&&Object.prototype.hasOwnProperty.call(C,"default")?C.default:C}function nV(C,e){return C(e={exports:{}},e.exports),e.exports}function rV(C){this.content=C}rV.prototype={constructor:rV,find:function(C){for(var e=0;e<this.content.length;e+=2)if(this.content[e]===C)return e
return-1},get:function(C){var e=this.find(C)
return-1==e?void 0:this.content[e+1]},update:function(C,e,t){var H=t&&t!=C?this.remove(t):this,i=H.find(C),V=H.content.slice()
return-1==i?V.push(t||C,e):(V[i+1]=e,t&&(V[i]=t)),new rV(V)},remove:function(C){var e=this.find(C)
if(-1==e)return this
var t=this.content.slice()
return t.splice(e,2),new rV(t)},addToStart:function(C,e){return new rV([C,e].concat(this.remove(C).content))},addToEnd:function(C,e){var t=this.remove(C).content.slice()
return t.push(C,e),new rV(t)},addBefore:function(C,e,t){var H=this.remove(e),i=H.content.slice(),V=H.find(C)
return i.splice(-1==V?i.length:V,0,e,t),new rV(i)},forEach:function(C){for(var e=0;e<this.content.length;e+=2)C(this.content[e],this.content[e+1])},prepend:function(C){return(C=rV.from(C)).size?new rV(C.content.concat(this.subtract(C).content)):this},append:function(C){return(C=rV.from(C)).size?new rV(this.subtract(C).content.concat(C.content)):this},subtract:function(C){var e=this
C=rV.from(C)
for(var t=0;t<C.content.length;t+=2)e=e.remove(C.content[t])
return e},get size(){return this.content.length>>1}},rV.from=function(C){if(C instanceof rV)return C
var e=[]
if(C)for(var t in C)e.push(t,C[t])
return new rV(e)}
var LV=rV,oV=nV(function(C,e){Object.defineProperty(e,"__esModule",{value:!0})
var t,H=(t=LV)&&"object"==typeof t&&"default"in t?t.default:t
var i=function(C,e){if(this.content=C,this.size=e||0,null==e)for(var t=0;t<C.length;t++)this.size+=C[t].nodeSize},V={firstChild:{},lastChild:{},childCount:{}}
i.prototype.nodesBetween=function(C,e,t,H,i){void 0===H&&(H=0)
for(var V=0,n=0;n<e;V++){var r=this.content[V],L=n+r.nodeSize
if(L>C&&!1!==t(r,H+n,i,V)&&r.content.size){var o=n+1
r.nodesBetween(Math.max(0,C-o),Math.min(r.content.size,e-o),t,H+o)}n=L}},i.prototype.descendants=function(C){this.nodesBetween(0,this.size,C)},i.prototype.textBetween=function(C,e,t,H){var i="",V=!0
return this.nodesBetween(C,e,function(n,r){n.isText?(i+=n.text.slice(Math.max(C,r)-r,e-r),V=!t):n.isLeaf&&H?(i+=H,V=!t):!V&&n.isBlock&&(i+=t,V=!0)},0),i},i.prototype.append=function(C){if(!C.size)return this
if(!this.size)return C
var e=this.lastChild,t=C.firstChild,H=this.content.slice(),V=0
for(e.isText&&e.sameMarkup(t)&&(H[H.length-1]=e.withText(e.text+t.text),V=1);V<C.content.length;V++)H.push(C.content[V])
return new i(H,this.size+C.size)},i.prototype.cut=function(C,e){if(null==e&&(e=this.size),0==C&&e==this.size)return this
var t=[],H=0
if(e>C)for(var V=0,n=0;n<e;V++){var r=this.content[V],L=n+r.nodeSize
L>C&&((n<C||L>e)&&(r=r.isText?r.cut(Math.max(0,C-n),Math.min(r.text.length,e-n)):r.cut(Math.max(0,C-n-1),Math.min(r.content.size,e-n-1))),t.push(r),H+=r.nodeSize),n=L}return new i(t,H)},i.prototype.cutByIndex=function(C,e){return C==e?i.empty:0==C&&e==this.content.length?this:new i(this.content.slice(C,e))},i.prototype.replaceChild=function(C,e){var t=this.content[C]
if(t==e)return this
var H=this.content.slice(),V=this.size+e.nodeSize-t.nodeSize
return H[C]=e,new i(H,V)},i.prototype.addToStart=function(C){return new i([C].concat(this.content),this.size+C.nodeSize)},i.prototype.addToEnd=function(C){return new i(this.content.concat(C),this.size+C.nodeSize)},i.prototype.eq=function(C){if(this.content.length!=C.content.length)return!1
for(var e=0;e<this.content.length;e++)if(!this.content[e].eq(C.content[e]))return!1
return!0},V.firstChild.get=function(){return this.content.length?this.content[0]:null},V.lastChild.get=function(){return this.content.length?this.content[this.content.length-1]:null},V.childCount.get=function(){return this.content.length},i.prototype.child=function(C){var e=this.content[C]
if(!e)throw new RangeError("Index "+C+" out of range for "+this)
return e},i.prototype.maybeChild=function(C){return this.content[C]},i.prototype.forEach=function(C){for(var e=0,t=0;e<this.content.length;e++){var H=this.content[e]
C(H,t,e),t+=H.nodeSize}},i.prototype.findDiffStart=function(C,e){return void 0===e&&(e=0),function C(e,t,H){for(var i=0;;i++){if(i==e.childCount||i==t.childCount)return e.childCount==t.childCount?null:H
var V=e.child(i),n=t.child(i)
if(V!=n){if(!V.sameMarkup(n))return H
if(V.isText&&V.text!=n.text){for(var r=0;V.text[r]==n.text[r];r++)H++
return H}if(V.content.size||n.content.size){var L=C(V.content,n.content,H+1)
if(null!=L)return L}H+=V.nodeSize}else H+=V.nodeSize}}(this,C,e)},i.prototype.findDiffEnd=function(C,e,t){return void 0===e&&(e=this.size),void 0===t&&(t=C.size),function C(e,t,H,i){for(var V=e.childCount,n=t.childCount;;){if(0==V||0==n)return V==n?null:{a:H,b:i}
var r=e.child(--V),L=t.child(--n),o=r.nodeSize
if(r!=L){if(!r.sameMarkup(L))return{a:H,b:i}
if(r.isText&&r.text!=L.text){for(var s=0,a=Math.min(r.text.length,L.text.length);s<a&&r.text[r.text.length-s-1]==L.text[L.text.length-s-1];)s++,H--,i--
return{a:H,b:i}}if(r.content.size||L.content.size){var M=C(r.content,L.content,H-1,i-1)
if(M)return M}H-=o,i-=o}else H-=o,i-=o}}(this,C,e,t)},i.prototype.findIndex=function(C,e){if(void 0===e&&(e=-1),0==C)return r(0,C)
if(C==this.size)return r(this.content.length,C)
if(C>this.size||C<0)throw new RangeError("Position "+C+" outside of fragment ("+this+")")
for(var t=0,H=0;;t++){var i=H+this.child(t).nodeSize
if(i>=C)return i==C||e>0?r(t+1,i):r(t,H)
H=i}},i.prototype.toString=function(){return"<"+this.toStringInner()+">"},i.prototype.toStringInner=function(){return this.content.join(", ")},i.prototype.toJSON=function(){return this.content.length?this.content.map(function(C){return C.toJSON()}):null},i.fromJSON=function(C,e){if(!e)return i.empty
if(!Array.isArray(e))throw new RangeError("Invalid input for Fragment.fromJSON")
return new i(e.map(C.nodeFromJSON))},i.fromArray=function(C){if(!C.length)return i.empty
for(var e,t=0,H=0;H<C.length;H++){var V=C[H]
t+=V.nodeSize,H&&V.isText&&C[H-1].sameMarkup(V)?(e||(e=C.slice(0,H)),e[e.length-1]=V.withText(e[e.length-1].text+V.text)):e&&e.push(V)}return new i(e||C,t)},i.from=function(C){return C?C instanceof i?C:Array.isArray(C)?this.fromArray(C):new i([C],C.nodeSize):i.empty},Object.defineProperties(i.prototype,V)
var n={index:0,offset:0}
function r(C,e){return n.index=C,n.offset=e,n}function L(C,e){if(C===e)return!0
if(!C||"object"!=typeof C||!e||"object"!=typeof e)return!1
var t=Array.isArray(C)
if(Array.isArray(e)!=t)return!1
if(t){if(C.length!=e.length)return!1
for(var H=0;H<C.length;H++)if(!L(C[H],e[H]))return!1}else{for(var i in C)if(!(i in e&&L(C[i],e[i])))return!1
for(var V in e)if(!(V in C))return!1}return!0}i.empty=new i([],0)
var o=function(C,e){this.type=C,this.attrs=e}
function s(C){var e=Error.call(this,C)
return e.__proto__=s.prototype,e}o.prototype.addToSet=function(C){for(var e,t=!1,H=0;H<C.length;H++){var i=C[H]
if(this.eq(i))return C
if(this.type.excludes(i.type))e||(e=C.slice(0,H))
else{if(i.type.excludes(this.type))return C
!t&&i.type.rank>this.type.rank&&(e||(e=C.slice(0,H)),e.push(this),t=!0),e&&e.push(i)}}return e||(e=C.slice()),t||e.push(this),e},o.prototype.removeFromSet=function(C){for(var e=0;e<C.length;e++)if(this.eq(C[e]))return C.slice(0,e).concat(C.slice(e+1))
return C},o.prototype.isInSet=function(C){for(var e=0;e<C.length;e++)if(this.eq(C[e]))return!0
return!1},o.prototype.eq=function(C){return this==C||this.type==C.type&&L(this.attrs,C.attrs)},o.prototype.toJSON=function(){var C={type:this.type.name}
for(var e in this.attrs){C.attrs=this.attrs
break}return C},o.fromJSON=function(C,e){if(!e)throw new RangeError("Invalid input for Mark.fromJSON")
var t=C.marks[e.type]
if(!t)throw new RangeError("There is no mark type "+e.type+" in this schema")
return t.create(e.attrs)},o.sameSet=function(C,e){if(C==e)return!0
if(C.length!=e.length)return!1
for(var t=0;t<C.length;t++)if(!C[t].eq(e[t]))return!1
return!0},o.setFrom=function(C){if(!C||0==C.length)return o.none
if(C instanceof o)return[C]
var e=C.slice()
return e.sort(function(C,e){return C.type.rank-e.type.rank}),e},o.none=[],s.prototype=Object.create(Error.prototype),s.prototype.constructor=s,s.prototype.name="ReplaceError"
var a=function(C,e,t){this.content=C,this.openStart=e,this.openEnd=t},M={size:{}}
function l(C,e,t){if(t.openStart>C.depth)throw new s("Inserted content deeper than insertion position")
if(C.depth-t.openStart!=e.depth-t.openEnd)throw new s("Inconsistent open depths")
return function C(e,t,H,V){var n=e.index(V),r=e.node(V)
if(n==t.index(V)&&V<e.depth-H.openStart){var L=C(e,t,H,V+1)
return r.copy(r.content.replaceChild(n,L))}if(H.content.size){if(H.openStart||H.openEnd||e.depth!=V||t.depth!=V){var o=function(C,e){for(var t=e.depth-C.openStart,H=e.node(t).copy(C.content),V=t-1;V>=0;V--)H=e.node(V).copy(i.from(H))
return{start:H.resolveNoCache(C.openStart+t),end:H.resolveNoCache(H.content.size-C.openEnd-t)}}(H,e),s=o.start,a=o.end
return p(r,function C(e,t,H,V,n){var r=e.depth>n&&c(e,t,n+1)
var L=V.depth>n&&c(H,V,n+1)
var o=[]
h(null,e,n,o)
r&&L&&t.index(n)==H.index(n)?(d(r,L),u(p(r,C(e,t,H,V,n+1)),o)):(r&&u(p(r,m(e,t,n+1)),o),h(t,H,n,o),L&&u(p(L,m(H,V,n+1)),o))
h(V,null,n,o)
return new i(o)}(e,s,a,t,V))}var M=e.parent,l=M.content
return p(M,l.cut(0,e.parentOffset).append(H.content).append(l.cut(t.parentOffset)))}return p(r,m(e,t,V))}(C,e,t,0)}function d(C,e){if(!e.type.compatibleContent(C.type))throw new s("Cannot join "+e.type.name+" onto "+C.type.name)}function c(C,e,t){var H=C.node(t)
return d(H,e.node(t)),H}function u(C,e){var t=e.length-1
t>=0&&C.isText&&C.sameMarkup(e[t])?e[t]=C.withText(e[t].text+C.text):e.push(C)}function h(C,e,t,H){var i=(e||C).node(t),V=0,n=e?e.index(t):i.childCount
C&&(V=C.index(t),C.depth>t?V++:C.textOffset&&(u(C.nodeAfter,H),V++))
for(var r=V;r<n;r++)u(i.child(r),H)
e&&e.depth==t&&e.textOffset&&u(e.nodeBefore,H)}function p(C,e){if(!C.type.validContent(e))throw new s("Invalid content for node "+C.type.name)
return C.copy(e)}function m(C,e,t){var H=[];(h(null,C,t,H),C.depth>t)&&u(p(c(C,e,t+1),m(C,e,t+1)),H)
return h(e,null,t,H),new i(H)}M.size.get=function(){return this.content.size-this.openStart-this.openEnd},a.prototype.insertAt=function(C,e){var t=function C(e,t,H,i){var V=e.findIndex(t)
var n=V.index
var r=V.offset
var L=e.maybeChild(n)
if(r==t||L.isText)return i&&!i.canReplace(n,n,H)?null:e.cut(0,t).append(H).append(e.cut(t))
var o=C(L.content,t-r-1,H)
return o&&e.replaceChild(n,L.copy(o))}(this.content,C+this.openStart,e,null)
return t&&new a(t,this.openStart,this.openEnd)},a.prototype.removeBetween=function(C,e){return new a(function C(e,t,H){var i=e.findIndex(t)
var V=i.index
var n=i.offset
var r=e.maybeChild(V)
var L=e.findIndex(H)
var o=L.index
var s=L.offset
if(n==t||r.isText){if(s!=H&&!e.child(o).isText)throw new RangeError("Removing non-flat range")
return e.cut(0,t).append(e.cut(H))}if(V!=o)throw new RangeError("Removing non-flat range")
return e.replaceChild(V,r.copy(C(r.content,t-n-1,H-n-1)))}(this.content,C+this.openStart,e+this.openStart),this.openStart,this.openEnd)},a.prototype.eq=function(C){return this.content.eq(C.content)&&this.openStart==C.openStart&&this.openEnd==C.openEnd},a.prototype.toString=function(){return this.content+"("+this.openStart+","+this.openEnd+")"},a.prototype.toJSON=function(){if(!this.content.size)return null
var C={content:this.content.toJSON()}
return this.openStart>0&&(C.openStart=this.openStart),this.openEnd>0&&(C.openEnd=this.openEnd),C},a.fromJSON=function(C,e){if(!e)return a.empty
var t=e.openStart||0,H=e.openEnd||0
if("number"!=typeof t||"number"!=typeof H)throw new RangeError("Invalid input for Slice.fromJSON")
return new a(i.fromJSON(C,e.content),e.openStart||0,e.openEnd||0)},a.maxOpen=function(C,e){void 0===e&&(e=!0)
for(var t=0,H=0,i=C.firstChild;i&&!i.isLeaf&&(e||!i.type.spec.isolating);i=i.firstChild)t++
for(var V=C.lastChild;V&&!V.isLeaf&&(e||!V.type.spec.isolating);V=V.lastChild)H++
return new a(C,t,H)},Object.defineProperties(a.prototype,M),a.empty=new a(i.empty,0,0)
var f=function(C,e,t){this.pos=C,this.path=e,this.depth=e.length/3-1,this.parentOffset=t},g={parent:{},doc:{},textOffset:{},nodeAfter:{},nodeBefore:{}}
f.prototype.resolveDepth=function(C){return null==C?this.depth:C<0?this.depth+C:C},g.parent.get=function(){return this.node(this.depth)},g.doc.get=function(){return this.node(0)},f.prototype.node=function(C){return this.path[3*this.resolveDepth(C)]},f.prototype.index=function(C){return this.path[3*this.resolveDepth(C)+1]},f.prototype.indexAfter=function(C){return C=this.resolveDepth(C),this.index(C)+(C!=this.depth||this.textOffset?1:0)},f.prototype.start=function(C){return 0==(C=this.resolveDepth(C))?0:this.path[3*C-1]+1},f.prototype.end=function(C){return C=this.resolveDepth(C),this.start(C)+this.node(C).content.size},f.prototype.before=function(C){if(!(C=this.resolveDepth(C)))throw new RangeError("There is no position before the top-level node")
return C==this.depth+1?this.pos:this.path[3*C-1]},f.prototype.after=function(C){if(!(C=this.resolveDepth(C)))throw new RangeError("There is no position after the top-level node")
return C==this.depth+1?this.pos:this.path[3*C-1]+this.path[3*C].nodeSize},g.textOffset.get=function(){return this.pos-this.path[this.path.length-1]},g.nodeAfter.get=function(){var C=this.parent,e=this.index(this.depth)
if(e==C.childCount)return null
var t=this.pos-this.path[this.path.length-1],H=C.child(e)
return t?C.child(e).cut(t):H},g.nodeBefore.get=function(){var C=this.index(this.depth),e=this.pos-this.path[this.path.length-1]
return e?this.parent.child(C).cut(0,e):0==C?null:this.parent.child(C-1)},f.prototype.marks=function(){var C=this.parent,e=this.index()
if(0==C.content.size)return o.none
if(this.textOffset)return C.child(e).marks
var t=C.maybeChild(e-1),H=C.maybeChild(e)
if(!t){var i=t
t=H,H=i}for(var V=t.marks,n=0;n<V.length;n++)!1!==V[n].type.spec.inclusive||H&&V[n].isInSet(H.marks)||(V=V[n--].removeFromSet(V))
return V},f.prototype.marksAcross=function(C){var e=this.parent.maybeChild(this.index())
if(!e||!e.isInline)return null
for(var t=e.marks,H=C.parent.maybeChild(C.index()),i=0;i<t.length;i++)!1!==t[i].type.spec.inclusive||H&&t[i].isInSet(H.marks)||(t=t[i--].removeFromSet(t))
return t},f.prototype.sharedDepth=function(C){for(var e=this.depth;e>0;e--)if(this.start(e)<=C&&this.end(e)>=C)return e
return 0},f.prototype.blockRange=function(C,e){if(void 0===C&&(C=this),C.pos<this.pos)return C.blockRange(this)
for(var t=this.depth-(this.parent.inlineContent||this.pos==C.pos?1:0);t>=0;t--)if(C.pos<=this.end(t)&&(!e||e(this.node(t))))return new b(this,C,t)},f.prototype.sameParent=function(C){return this.pos-this.parentOffset==C.pos-C.parentOffset},f.prototype.max=function(C){return C.pos>this.pos?C:this},f.prototype.min=function(C){return C.pos<this.pos?C:this},f.prototype.toString=function(){for(var C="",e=1;e<=this.depth;e++)C+=(C?"/":"")+this.node(e).type.name+"_"+this.index(e-1)
return C+":"+this.parentOffset},f.resolve=function(C,e){if(!(e>=0&&e<=C.content.size))throw new RangeError("Position "+e+" out of range")
for(var t=[],H=0,i=e,V=C;;){var n=V.content.findIndex(i),r=n.index,L=n.offset,o=i-L
if(t.push(V,r,H+L),!o)break
if((V=V.child(r)).isText)break
i=o-1,H+=L+1}return new f(e,t,i)},f.resolveCached=function(C,e){for(var t=0;t<Z.length;t++){var H=Z[t]
if(H.pos==e&&H.doc==C)return H}var i=Z[v]=f.resolve(C,e)
return v=(v+1)%y,i},Object.defineProperties(f.prototype,g)
var Z=[],v=0,y=12,b=function(C,e,t){this.$from=C,this.$to=e,this.depth=t},k={start:{},end:{},parent:{},startIndex:{},endIndex:{}}
k.start.get=function(){return this.$from.before(this.depth+1)},k.end.get=function(){return this.$to.after(this.depth+1)},k.parent.get=function(){return this.$from.node(this.depth)},k.startIndex.get=function(){return this.$from.index(this.depth)},k.endIndex.get=function(){return this.$to.indexAfter(this.depth)},Object.defineProperties(b.prototype,k)
var w=Object.create(null),S=function(C,e,t,H){this.type=C,this.attrs=e,this.content=t||i.empty,this.marks=H||o.none},O={nodeSize:{},childCount:{},textContent:{},firstChild:{},lastChild:{},isBlock:{},isTextblock:{},inlineContent:{},isInline:{},isText:{},isLeaf:{},isAtom:{}}
O.nodeSize.get=function(){return this.isLeaf?1:2+this.content.size},O.childCount.get=function(){return this.content.childCount},S.prototype.child=function(C){return this.content.child(C)},S.prototype.maybeChild=function(C){return this.content.maybeChild(C)},S.prototype.forEach=function(C){this.content.forEach(C)},S.prototype.nodesBetween=function(C,e,t,H){void 0===H&&(H=0),this.content.nodesBetween(C,e,t,H,this)},S.prototype.descendants=function(C){this.nodesBetween(0,this.content.size,C)},O.textContent.get=function(){return this.textBetween(0,this.content.size,"")},S.prototype.textBetween=function(C,e,t,H){return this.content.textBetween(C,e,t,H)},O.firstChild.get=function(){return this.content.firstChild},O.lastChild.get=function(){return this.content.lastChild},S.prototype.eq=function(C){return this==C||this.sameMarkup(C)&&this.content.eq(C.content)},S.prototype.sameMarkup=function(C){return this.hasMarkup(C.type,C.attrs,C.marks)},S.prototype.hasMarkup=function(C,e,t){return this.type==C&&L(this.attrs,e||C.defaultAttrs||w)&&o.sameSet(this.marks,t||o.none)},S.prototype.copy=function(C){return void 0===C&&(C=null),C==this.content?this:new this.constructor(this.type,this.attrs,C,this.marks)},S.prototype.mark=function(C){return C==this.marks?this:new this.constructor(this.type,this.attrs,this.content,C)},S.prototype.cut=function(C,e){return 0==C&&e==this.content.size?this:this.copy(this.content.cut(C,e))},S.prototype.slice=function(C,e,t){if(void 0===e&&(e=this.content.size),void 0===t&&(t=!1),C==e)return a.empty
var H=this.resolve(C),i=this.resolve(e),V=t?0:H.sharedDepth(e),n=H.start(V),r=H.node(V).content.cut(H.pos-n,i.pos-n)
return new a(r,H.depth-V,i.depth-V)},S.prototype.replace=function(C,e,t){return l(this.resolve(C),this.resolve(e),t)},S.prototype.nodeAt=function(C){for(var e=this;;){var t=e.content.findIndex(C),H=t.index,i=t.offset
if(!(e=e.maybeChild(H)))return null
if(i==C||e.isText)return e
C-=i+1}},S.prototype.childAfter=function(C){var e=this.content.findIndex(C),t=e.index,H=e.offset
return{node:this.content.maybeChild(t),index:t,offset:H}},S.prototype.childBefore=function(C){if(0==C)return{node:null,index:0,offset:0}
var e=this.content.findIndex(C),t=e.index,H=e.offset
if(H<C)return{node:this.content.child(t),index:t,offset:H}
var i=this.content.child(t-1)
return{node:i,index:t-1,offset:H-i.nodeSize}},S.prototype.resolve=function(C){return f.resolveCached(this,C)},S.prototype.resolveNoCache=function(C){return f.resolve(this,C)},S.prototype.rangeHasMark=function(C,e,t){var H=!1
return e>C&&this.nodesBetween(C,e,function(C){return t.isInSet(C.marks)&&(H=!0),!H}),H},O.isBlock.get=function(){return this.type.isBlock},O.isTextblock.get=function(){return this.type.isTextblock},O.inlineContent.get=function(){return this.type.inlineContent},O.isInline.get=function(){return this.type.isInline},O.isText.get=function(){return this.type.isText}
O.isLeaf.get=function(){return this.type.isLeaf},O.isAtom.get=function(){return this.type.isAtom},S.prototype.toString=function(){if(this.type.spec.toDebugString)return this.type.spec.toDebugString(this)
var C=this.type.name
return this.content.size&&(C+="("+this.content.toStringInner()+")"),A(this.marks,C)},S.prototype.contentMatchAt=function(C){var e=this.type.contentMatch.matchFragment(this.content,0,C)
if(!e)throw new Error("Called contentMatchAt on a node with invalid content")
return e},S.prototype.canReplace=function(C,e,t,H,V){void 0===t&&(t=i.empty),void 0===H&&(H=0),void 0===V&&(V=t.childCount)
var n=this.contentMatchAt(C).matchFragment(t,H,V),r=n&&n.matchFragment(this.content,e)
if(!r||!r.validEnd)return!1
for(var L=H;L<V;L++)if(!this.type.allowsMarks(t.child(L).marks))return!1
return!0},S.prototype.canReplaceWith=function(C,e,t,H){if(H&&!this.type.allowsMarks(H))return!1
var i=this.contentMatchAt(C).matchType(t),V=i&&i.matchFragment(this.content,e)
return!!V&&V.validEnd},S.prototype.canAppend=function(C){return C.content.size?this.canReplace(this.childCount,this.childCount,C.content):this.type.compatibleContent(C.type)},S.prototype.defaultContentType=function(C){return this.contentMatchAt(C).defaultType},S.prototype.check=function(){if(!this.type.validContent(this.content))throw new RangeError("Invalid content for node "+this.type.name+": "+this.content.toString().slice(0,50))
this.content.forEach(function(C){return C.check()})},S.prototype.toJSON=function(){var C={type:this.type.name}
for(var e in this.attrs){C.attrs=this.attrs
break}return this.content.size&&(C.content=this.content.toJSON()),this.marks.length&&(C.marks=this.marks.map(function(C){return C.toJSON()})),C},S.fromJSON=function(C,e){if(!e)throw new RangeError("Invalid input for Node.fromJSON")
var t=null
if(e.marks){if(!Array.isArray(e.marks))throw new RangeError("Invalid mark data for Node.fromJSON")
t=e.marks.map(C.markFromJSON)}if("text"==e.type){if("string"!=typeof e.text)throw new RangeError("Invalid text node in JSON")
return C.text(e.text,t)}var H=i.fromJSON(C,e.content)
return C.nodeType(e.type).create(e.attrs,H,t)},Object.defineProperties(S.prototype,O)
var x=function(C){function e(e,t,H,i){if(C.call(this,e,t,null,i),!H)throw new RangeError("Empty text nodes are not allowed")
this.text=H}C&&(e.__proto__=C),e.prototype=Object.create(C&&C.prototype),e.prototype.constructor=e
var t={textContent:{},nodeSize:{}}
return e.prototype.toString=function(){return this.type.spec.toDebugString?this.type.spec.toDebugString(this):A(this.marks,JSON.stringify(this.text))},t.textContent.get=function(){return this.text},e.prototype.textBetween=function(C,e){return this.text.slice(C,e)},t.nodeSize.get=function(){return this.text.length},e.prototype.mark=function(C){return C==this.marks?this:new e(this.type,this.attrs,this.text,C)},e.prototype.withText=function(C){return C==this.text?this:new e(this.type,this.attrs,C,this.marks)},e.prototype.cut=function(C,e){return void 0===C&&(C=0),void 0===e&&(e=this.text.length),0==C&&e==this.text.length?this:this.withText(this.text.slice(C,e))},e.prototype.eq=function(C){return this.sameMarkup(C)&&this.text==C.text},e.prototype.toJSON=function(){var e=C.prototype.toJSON.call(this)
return e.text=this.text,e},Object.defineProperties(e.prototype,t),e}(S)
function A(C,e){for(var t=C.length-1;t>=0;t--)e=C[t].type.name+"("+e+")"
return e}var T=function(C){this.validEnd=C,this.next=[],this.wrapCache=[]},B={inlineContent:{},defaultType:{},edgeCount:{}}
T.parse=function(C,e){var t=new E(C,e)
if(null==t.next)return T.empty
var H=N(t)
t.next&&t.err("Unexpected trailing text")
var i=function(C){var e=Object.create(null)
return function t(H){var i=[]
H.forEach(function(e){C[e].forEach(function(e){var t=e.term,H=e.to
if(t){var V=i.indexOf(t),n=V>-1&&i[V+1]
z(C,H).forEach(function(C){n||i.push(t,n=[]),-1==n.indexOf(C)&&n.push(C)})}})})
var V=e[H.join(",")]=new T(H.indexOf(C.length-1)>-1)
for(var n=0;n<i.length;n+=2){var r=i[n+1].sort(_)
V.next.push(i[n],e[r.join(",")]||t(r))}return V}(z(C,0))}(function(C){var e=[[]]
return i(function C(e,V){if("choice"==e.type)return e.exprs.reduce(function(e,t){return e.concat(C(t,V))},[])
if("seq"==e.type)for(var n=0;;n++){var r=C(e.exprs[n],V)
if(n==e.exprs.length-1)return r
i(r,V=t())}else{if("star"==e.type){var L=t()
return H(V,L),i(C(e.expr,L),L),[H(L)]}if("plus"==e.type){var o=t()
return i(C(e.expr,V),o),i(C(e.expr,o),o),[H(o)]}if("opt"==e.type)return[H(V)].concat(C(e.expr,V))
if("range"==e.type){for(var s=V,a=0;a<e.min;a++){var M=t()
i(C(e.expr,s),M),s=M}if(-1==e.max)i(C(e.expr,s),s)
else for(var l=e.min;l<e.max;l++){var d=t()
H(s,d),i(C(e.expr,s),d),s=d}return[H(s)]}if("name"==e.type)return[H(V,null,e.value)]}}(C,0),t()),e
function t(){return e.push([])-1}function H(C,t,H){var i={term:H,to:t}
return e[C].push(i),i}function i(C,e){C.forEach(function(C){return C.to=e})}}(H))
return function(C,e){for(var t=0,H=[C];t<H.length;t++){for(var i=H[t],V=!i.validEnd,n=[],r=0;r<i.next.length;r+=2){var L=i.next[r],o=i.next[r+1]
n.push(L.name),!V||L.isText||L.hasRequiredAttrs()||(V=!1),-1==H.indexOf(o)&&H.push(o)}V&&e.err("Only non-generatable nodes ("+n.join(", ")+") in a required position")}}(i,t),i},T.prototype.matchType=function(C){for(var e=0;e<this.next.length;e+=2)if(this.next[e]==C)return this.next[e+1]
return null},T.prototype.matchFragment=function(C,e,t){void 0===e&&(e=0),void 0===t&&(t=C.childCount)
for(var H=this,i=e;H&&i<t;i++)H=H.matchType(C.child(i).type)
return H},B.inlineContent.get=function(){var C=this.next[0]
return!!C&&C.isInline},B.defaultType.get=function(){for(var C=0;C<this.next.length;C+=2){var e=this.next[C]
if(!e.isText&&!e.hasRequiredAttrs())return e}},T.prototype.compatible=function(C){for(var e=0;e<this.next.length;e+=2)for(var t=0;t<C.next.length;t+=2)if(this.next[e]==C.next[t])return!0
return!1},T.prototype.fillBefore=function(C,e,t){void 0===e&&(e=!1),void 0===t&&(t=0)
var H=[this]
return function V(n,r){var L=n.matchFragment(C,t)
if(L&&(!e||L.validEnd))return i.from(r.map(function(C){return C.createAndFill()}))
for(var o=0;o<n.next.length;o+=2){var s=n.next[o],a=n.next[o+1]
if(!s.isText&&!s.hasRequiredAttrs()&&-1==H.indexOf(a)){H.push(a)
var M=V(a,r.concat(s))
if(M)return M}}}(this,[])},T.prototype.findWrapping=function(C){for(var e=0;e<this.wrapCache.length;e+=2)if(this.wrapCache[e]==C)return this.wrapCache[e+1]
var t=this.computeWrapping(C)
return this.wrapCache.push(C,t),t},T.prototype.computeWrapping=function(C){for(var e=Object.create(null),t=[{match:this,type:null,via:null}];t.length;){var H=t.shift(),i=H.match
if(i.matchType(C)){for(var V=[],n=H;n.type;n=n.via)V.push(n.type)
return V.reverse()}for(var r=0;r<i.next.length;r+=2){var L=i.next[r]
L.isLeaf||L.hasRequiredAttrs()||L.name in e||H.type&&!i.next[r+1].validEnd||(t.push({match:L.contentMatch,type:L,via:H}),e[L.name]=!0)}}},B.edgeCount.get=function(){return this.next.length>>1},T.prototype.edge=function(C){var e=C<<1
if(e>this.next.length)throw new RangeError("There's no "+C+"th edge in this content match")
return{type:this.next[e],next:this.next[e+1]}},T.prototype.toString=function(){var C=[]
return function e(t){C.push(t)
for(var H=1;H<t.next.length;H+=2)-1==C.indexOf(t.next[H])&&e(t.next[H])}(this),C.map(function(e,t){for(var H=t+(e.validEnd?"*":" ")+" ",i=0;i<e.next.length;i+=2)H+=(i?", ":"")+e.next[i].name+"->"+C.indexOf(e.next[i+1])
return H}).join("\n")},Object.defineProperties(T.prototype,B),T.empty=new T(!0)
var E=function(C,e){this.string=C,this.nodeTypes=e,this.inline=null,this.pos=0,this.tokens=C.split(/\s*(?=\b|\W|$)/),""==this.tokens[this.tokens.length-1]&&this.tokens.pop(),""==this.tokens[0]&&this.tokens.unshift()},D={next:{}}
function N(C){var e=[]
do{e.push(P(C))}while(C.eat("|"))
return 1==e.length?e[0]:{type:"choice",exprs:e}}function P(C){var e=[]
do{e.push(R(C))}while(C.next&&")"!=C.next&&"|"!=C.next)
return 1==e.length?e[0]:{type:"seq",exprs:e}}function R(C){for(var e=function(C){if(C.eat("(")){var e=N(C)
return C.eat(")")||C.err("Missing closing paren"),e}if(!/\W/.test(C.next)){var t=function(C,e){var t=C.nodeTypes,H=t[e]
if(H)return[H]
var i=[]
for(var V in t){var n=t[V]
n.groups.indexOf(e)>-1&&i.push(n)}0==i.length&&C.err("No node type or group '"+e+"' found")
return i}(C,C.next).map(function(e){return null==C.inline?C.inline=e.isInline:C.inline!=e.isInline&&C.err("Mixing inline and block content"),{type:"name",value:e}})
return C.pos++,1==t.length?t[0]:{type:"choice",exprs:t}}C.err("Unexpected token '"+C.next+"'")}(C);;)if(C.eat("+"))e={type:"plus",expr:e}
else if(C.eat("*"))e={type:"star",expr:e}
else if(C.eat("?"))e={type:"opt",expr:e}
else{if(!C.eat("{"))break
e=I(C,e)}return e}function F(C){/\D/.test(C.next)&&C.err("Expected number, got '"+C.next+"'")
var e=Number(C.next)
return C.pos++,e}function I(C,e){var t=F(C),H=t
return C.eat(",")&&(H="}"!=C.next?F(C):-1),C.eat("}")||C.err("Unclosed braced range"),{type:"range",min:t,max:H,expr:e}}function _(C,e){return C-e}function z(C,e){var t=[]
return function e(H){var i=C[H]
if(1==i.length&&!i[0].term)return e(i[0].to)
t.push(H)
for(var V=0;V<i.length;V++){var n=i[V],r=n.term,L=n.to
r||-1!=t.indexOf(L)||e(L)}}(e),t.sort(_)}function W(C){var e=Object.create(null)
for(var t in C){var H=C[t]
if(!H.hasDefault)return null
e[t]=H.default}return e}function j(C,e){var t=Object.create(null)
for(var H in C){var i=e&&e[H]
if(void 0===i){var V=C[H]
if(!V.hasDefault)throw new RangeError("No value supplied for attribute "+H)
i=V.default}t[H]=i}return t}function U(C){var e=Object.create(null)
if(C)for(var t in C)e[t]=new q(C[t])
return e}D.next.get=function(){return this.tokens[this.pos]},E.prototype.eat=function(C){return this.next==C&&(this.pos++||!0)},E.prototype.err=function(C){throw new SyntaxError(C+" (in content expression '"+this.string+"')")},Object.defineProperties(E.prototype,D)
var G=function(C,e,t){this.name=C,this.schema=e,this.spec=t,this.groups=t.group?t.group.split(" "):[],this.attrs=U(t.attrs),this.defaultAttrs=W(this.attrs),this.contentMatch=null,this.markSet=null,this.inlineContent=null,this.isBlock=!(t.inline||"text"==C),this.isText="text"==C},$={isInline:{},isTextblock:{},isLeaf:{},isAtom:{}}
$.isInline.get=function(){return!this.isBlock},$.isTextblock.get=function(){return this.isBlock&&this.inlineContent},$.isLeaf.get=function(){return this.contentMatch==T.empty},$.isAtom.get=function(){return this.isLeaf||this.spec.atom},G.prototype.hasRequiredAttrs=function(C){for(var e in this.attrs)if(this.attrs[e].isRequired&&(!C||!(e in C)))return!0
return!1},G.prototype.compatibleContent=function(C){return this==C||this.contentMatch.compatible(C.contentMatch)},G.prototype.computeAttrs=function(C){return!C&&this.defaultAttrs?this.defaultAttrs:j(this.attrs,C)},G.prototype.create=function(C,e,t){if(this.isText)throw new Error("NodeType.create can't construct text nodes")
return new S(this,this.computeAttrs(C),i.from(e),o.setFrom(t))},G.prototype.createChecked=function(C,e,t){if(e=i.from(e),!this.validContent(e))throw new RangeError("Invalid content for node "+this.name)
return new S(this,this.computeAttrs(C),e,o.setFrom(t))},G.prototype.createAndFill=function(C,e,t){if(C=this.computeAttrs(C),(e=i.from(e)).size){var H=this.contentMatch.fillBefore(e)
if(!H)return null
e=H.append(e)}var V=this.contentMatch.matchFragment(e).fillBefore(i.empty,!0)
return V?new S(this,C,e.append(V),o.setFrom(t)):null},G.prototype.validContent=function(C){var e=this.contentMatch.matchFragment(C)
if(!e||!e.validEnd)return!1
for(var t=0;t<C.childCount;t++)if(!this.allowsMarks(C.child(t).marks))return!1
return!0},G.prototype.allowsMarkType=function(C){return null==this.markSet||this.markSet.indexOf(C)>-1},G.prototype.allowsMarks=function(C){if(null==this.markSet)return!0
for(var e=0;e<C.length;e++)if(!this.allowsMarkType(C[e].type))return!1
return!0},G.prototype.allowedMarks=function(C){var e
if(null==this.markSet)return C
for(var t=0;t<C.length;t++)this.allowsMarkType(C[t].type)?e&&e.push(C[t]):e||(e=C.slice(0,t))
return e?e.length?e:o.empty:C},G.compile=function(C,e){var t=Object.create(null)
C.forEach(function(C,H){return t[C]=new G(C,e,H)})
var H=e.spec.topNode||"doc"
if(!t[H])throw new RangeError("Schema is missing its top node type ('"+H+"')")
if(!t.text)throw new RangeError("Every schema needs a 'text' type")
for(var i in t.text.attrs)throw new RangeError("The text node type should not have attributes")
return t},Object.defineProperties(G.prototype,$)
var q=function(C){this.hasDefault=Object.prototype.hasOwnProperty.call(C,"default"),this.default=C.default},K={isRequired:{}}
K.isRequired.get=function(){return!this.hasDefault},Object.defineProperties(q.prototype,K)
var J=function(C,e,t,H){this.name=C,this.schema=t,this.spec=H,this.attrs=U(H.attrs),this.rank=e,this.excluded=null
var i=W(this.attrs)
this.instance=i&&new o(this,i)}
J.prototype.create=function(C){return!C&&this.instance?this.instance:new o(this,j(this.attrs,C))},J.compile=function(C,e){var t=Object.create(null),H=0
return C.forEach(function(C,i){return t[C]=new J(C,H++,e,i)}),t},J.prototype.removeFromSet=function(C){for(var e=0;e<C.length;e++)if(C[e].type==this)return C.slice(0,e).concat(C.slice(e+1))
return C},J.prototype.isInSet=function(C){for(var e=0;e<C.length;e++)if(C[e].type==this)return C[e]},J.prototype.excludes=function(C){return this.excluded.indexOf(C)>-1}
var Y=function(C){for(var e in this.spec={},C)this.spec[e]=C[e]
this.spec.nodes=H.from(C.nodes),this.spec.marks=H.from(C.marks),this.nodes=G.compile(this.spec.nodes,this),this.marks=J.compile(this.spec.marks,this)
var t=Object.create(null)
for(var i in this.nodes){if(i in this.marks)throw new RangeError(i+" can not be both a node and a mark")
var V=this.nodes[i],n=V.spec.content||"",r=V.spec.marks
V.contentMatch=t[n]||(t[n]=T.parse(n,this.nodes)),V.inlineContent=V.contentMatch.inlineContent,V.markSet="_"==r?null:r?X(this,r.split(" ")):""!=r&&V.inlineContent?null:[]}for(var L in this.marks){var o=this.marks[L],s=o.spec.excludes
o.excluded=null==s?[o]:""==s?[]:X(this,s.split(" "))}this.nodeFromJSON=this.nodeFromJSON.bind(this),this.markFromJSON=this.markFromJSON.bind(this),this.topNodeType=this.nodes[this.spec.topNode||"doc"],this.cached=Object.create(null),this.cached.wrappings=Object.create(null)}
function X(C,e){for(var t=[],H=0;H<e.length;H++){var i=e[H],V=C.marks[i],n=V
if(V)t.push(V)
else for(var r in C.marks){var L=C.marks[r];("_"==i||L.spec.group&&L.spec.group.split(" ").indexOf(i)>-1)&&t.push(n=L)}if(!n)throw new SyntaxError("Unknown mark type: '"+e[H]+"'")}return t}Y.prototype.node=function(C,e,t,H){if("string"==typeof C)C=this.nodeType(C)
else{if(!(C instanceof G))throw new RangeError("Invalid node type: "+C)
if(C.schema!=this)throw new RangeError("Node type from different schema used ("+C.name+")")}return C.createChecked(e,t,H)},Y.prototype.text=function(C,e){var t=this.nodes.text
return new x(t,t.defaultAttrs,C,o.setFrom(e))},Y.prototype.mark=function(C,e){return"string"==typeof C&&(C=this.marks[C]),C.create(e)},Y.prototype.nodeFromJSON=function(C){return S.fromJSON(this,C)},Y.prototype.markFromJSON=function(C){return o.fromJSON(this,C)},Y.prototype.nodeType=function(C){var e=this.nodes[C]
if(!e)throw new RangeError("Unknown node type: "+C)
return e}
var Q=function(C,e){var t=this
this.schema=C,this.rules=e,this.tags=[],this.styles=[],e.forEach(function(C){C.tag?t.tags.push(C):C.style&&t.styles.push(C)})}
Q.prototype.parse=function(C,e){void 0===e&&(e={})
var t=new rC(this,e,!1)
return t.addAll(C,null,e.from,e.to),t.finish()},Q.prototype.parseSlice=function(C,e){void 0===e&&(e={})
var t=new rC(this,e,!0)
return t.addAll(C,null,e.from,e.to),a.maxOpen(t.finish())},Q.prototype.matchTag=function(C,e){for(var t=0;t<this.tags.length;t++){var H=this.tags[t]
if(oC(C,H.tag)&&(void 0===H.namespace||C.namespaceURI==H.namespace)&&(!H.context||e.matchesContext(H.context))){if(H.getAttrs){var i=H.getAttrs(C)
if(!1===i)continue
H.attrs=i}return H}}},Q.prototype.matchStyle=function(C,e,t){for(var H=0;H<this.styles.length;H++){var i=this.styles[H]
if(!(0!=i.style.indexOf(C)||i.context&&!t.matchesContext(i.context)||i.style.length>C.length&&(61!=i.style.charCodeAt(C.length)||i.style.slice(C.length+1)!=e))){if(i.getAttrs){var V=i.getAttrs(e)
if(!1===V)continue
i.attrs=V}return i}}},Q.schemaRules=function(C){var e=[]
function t(C){for(var t=null==C.priority?50:C.priority,H=0;H<e.length;H++){var i=e[H]
if((null==i.priority?50:i.priority)<t)break}e.splice(H,0,C)}var H=function(e){var H=C.marks[e].spec.parseDOM
H&&H.forEach(function(C){t(C=sC(C)),C.mark=e})}
for(var i in C.marks)H(i)
var V
for(var n in C.nodes)V=void 0,(V=C.nodes[n].spec.parseDOM)&&V.forEach(function(C){t(C=sC(C)),C.node=n})
return e},Q.fromSchema=function(C){return C.cached.domParser||(C.cached.domParser=new Q(C,Q.schemaRules(C)))}
var CC={address:!0,article:!0,aside:!0,blockquote:!0,canvas:!0,dd:!0,div:!0,dl:!0,fieldset:!0,figcaption:!0,figure:!0,footer:!0,form:!0,h1:!0,h2:!0,h3:!0,h4:!0,h5:!0,h6:!0,header:!0,hgroup:!0,hr:!0,li:!0,noscript:!0,ol:!0,output:!0,p:!0,pre:!0,section:!0,table:!0,tfoot:!0,ul:!0},eC={head:!0,noscript:!0,object:!0,script:!0,style:!0,title:!0},tC={ol:!0,ul:!0},HC=1,iC=2
function VC(C){return(C?HC:0)|("full"===C?iC:0)}var nC=function(C,e,t,H,i,V){this.type=C,this.attrs=e,this.solid=H,this.match=i||(4&V?null:C.contentMatch),this.options=V,this.content=[],this.marks=t,this.activeMarks=o.none}
nC.prototype.findWrapping=function(C){if(!this.match){if(!this.type)return[]
var e=this.type.contentMatch.fillBefore(i.from(C))
if(!e){var t,H=this.type.contentMatch
return(t=H.findWrapping(C.type))?(this.match=H,t):null}this.match=this.type.contentMatch.matchFragment(e)}return this.match.findWrapping(C.type)},nC.prototype.finish=function(C){if(!(this.options&HC)){var e,t=this.content[this.content.length-1]
t&&t.isText&&(e=/\s+$/.exec(t.text))&&(t.text.length==e[0].length?this.content.pop():this.content[this.content.length-1]=t.withText(t.text.slice(0,t.text.length-e[0].length)))}var H=i.from(this.content)
return!C&&this.match&&(H=H.append(this.match.fillBefore(i.empty,!0))),this.type?this.type.create(this.attrs,H,this.marks):H}
var rC=function(C,e,t){this.parser=C,this.options=e,this.isOpen=t,this.pendingMarks=[]
var H,i=e.topNode,V=VC(e.preserveWhitespace)|(t?4:0)
H=i?new nC(i.type,i.attrs,o.none,!0,e.topMatch||i.type.contentMatch,V):new nC(t?null:C.schema.topNodeType,null,o.none,!0,null,V),this.nodes=[H],this.open=0,this.find=e.findPositions,this.needsBlock=!1},LC={top:{},currentPos:{}}
function oC(C,e){return(C.matches||C.msMatchesSelector||C.webkitMatchesSelector||C.mozMatchesSelector).call(C,e)}function sC(C){var e={}
for(var t in C)e[t]=C[t]
return e}LC.top.get=function(){return this.nodes[this.open]},rC.prototype.addDOM=function(C){if(3==C.nodeType)this.addTextNode(C)
else if(1==C.nodeType){var e=C.getAttribute("style"),t=e?this.readStyles(function(C){var e,t=/\s*([\w-]+)\s*:\s*([^;]+)/g,H=[]
for(;e=t.exec(C);)H.push(e[1],e[2].trim())
return H}(e)):null
if(null!=t)for(var H=0;H<t.length;H++)this.addPendingMark(t[H])
if(this.addElement(C),null!=t)for(var i=0;i<t.length;i++)this.removePendingMark(t[i])}},rC.prototype.addTextNode=function(C){var e=C.nodeValue,t=this.top
if((t.type?t.type.inlineContent:t.content.length&&t.content[0].isInline)||/\S/.test(e)){if(t.options&HC)t.options&iC||(e=e.replace(/\r?\n|\r/g," "))
else if(e=e.replace(/\s+/g," "),/^\s/.test(e)&&this.open==this.nodes.length-1){var H=t.content[t.content.length-1],i=C.previousSibling;(!H||i&&"BR"==i.nodeName||H.isText&&/\s$/.test(H.text))&&(e=e.slice(1))}e&&this.insertNode(this.parser.schema.text(e)),this.findInText(C)}else this.findInside(C)},rC.prototype.addElement=function(C){var e=C.nodeName.toLowerCase()
tC.hasOwnProperty(e)&&function(C){for(var e=C.firstChild,t=null;e;e=e.nextSibling){var H=1==e.nodeType?e.nodeName.toLowerCase():null
H&&tC.hasOwnProperty(H)&&t?(t.appendChild(e),e=t):"li"==H?t=e:H&&(t=null)}}(C)
var t=this.options.ruleFromNode&&this.options.ruleFromNode(C)||this.parser.matchTag(C,this)
if(t?t.ignore:eC.hasOwnProperty(e))this.findInside(C)
else if(!t||t.skip){t&&t.skip.nodeType&&(C=t.skip)
var H,i=this.top,V=this.needsBlock
CC.hasOwnProperty(e)&&(H=!0,i.type||(this.needsBlock=!0)),this.addAll(C),H&&this.sync(i),this.needsBlock=V}else this.addElementByRule(C,t)},rC.prototype.readStyles=function(C){for(var e=o.none,t=0;t<C.length;t+=2){var H=this.parser.matchStyle(C[t],C[t+1],this)
if(H){if(H.ignore)return null
e=this.parser.schema.marks[H.mark].create(H.attrs).addToSet(e)}}return e},rC.prototype.addElementByRule=function(C,e){var t,H,i,V=this
e.node?(H=this.parser.schema.nodes[e.node]).isLeaf?this.insertNode(H.create(e.attrs)):t=this.enter(H,e.attrs,e.preserveWhitespace):(i=this.parser.schema.marks[e.mark].create(e.attrs),this.addPendingMark(i))
var n=this.top
if(H&&H.isLeaf)this.findInside(C)
else if(e.getContent)this.findInside(C),e.getContent(C,this.parser.schema).forEach(function(C){return V.insertNode(C)})
else{var r=e.contentElement
"string"==typeof r?r=C.querySelector(r):"function"==typeof r&&(r=r(C)),r||(r=C),this.findAround(C,r,!0),this.addAll(r,t)}return t&&(this.sync(n),this.open--),i&&this.removePendingMark(i),!0},rC.prototype.addAll=function(C,e,t,H){for(var i=t||0,V=t?C.childNodes[t]:C.firstChild,n=null==H?null:C.childNodes[H];V!=n;V=V.nextSibling,++i)this.findAtPoint(C,i),this.addDOM(V),e&&CC.hasOwnProperty(V.nodeName.toLowerCase())&&this.sync(e)
this.findAtPoint(C,i)},rC.prototype.findPlace=function(C){for(var e,t,H=this.open;H>=0;H--){var i=this.nodes[H],V=i.findWrapping(C)
if(V&&(!e||e.length>V.length)&&(e=V,t=i,!V.length))break
if(i.solid)break}if(!e)return!1
this.sync(t)
for(var n=0;n<e.length;n++)this.enterInner(e[n],null,!1)
return!0},rC.prototype.insertNode=function(C){if(C.isInline&&this.needsBlock&&!this.top.type){var e=this.textblockFromContext()
e&&this.enterInner(e)}if(this.findPlace(C)){this.closeExtra()
var t=this.top
this.applyPendingMarks(t),t.match&&(t.match=t.match.matchType(C.type))
for(var H=t.activeMarks,i=0;i<C.marks.length;i++)t.type&&!t.type.allowsMarkType(C.marks[i].type)||(H=C.marks[i].addToSet(H))
t.content.push(C.mark(H))}},rC.prototype.applyPendingMarks=function(C){for(var e=0;e<this.pendingMarks.length;e++){var t=this.pendingMarks[e]
C.type&&!C.type.allowsMarkType(t.type)||t.type.isInSet(C.activeMarks)||(C.activeMarks=t.addToSet(C.activeMarks),this.pendingMarks.splice(e--,1))}},rC.prototype.enter=function(C,e,t){var H=this.findPlace(C.create(e))
return H&&(this.applyPendingMarks(this.top),this.enterInner(C,e,!0,t)),H},rC.prototype.enterInner=function(C,e,t,H){this.closeExtra()
var i=this.top
i.match=i.match&&i.match.matchType(C,e)
var V=null==H?-5&i.options:VC(H)
4&i.options&&0==i.content.length&&(V|=4),this.nodes.push(new nC(C,e,i.activeMarks,t,null,V)),this.open++},rC.prototype.closeExtra=function(C){var e=this.nodes.length-1
if(e>this.open){for(;e>this.open;e--)this.nodes[e-1].content.push(this.nodes[e].finish(C))
this.nodes.length=this.open+1}},rC.prototype.finish=function(){return this.open=0,this.closeExtra(this.isOpen),this.nodes[0].finish(this.isOpen||this.options.topOpen)},rC.prototype.sync=function(C){for(var e=this.open;e>=0;e--)if(this.nodes[e]==C)return void(this.open=e)},rC.prototype.addPendingMark=function(C){this.pendingMarks.push(C)},rC.prototype.removePendingMark=function(C){var e=this.pendingMarks.lastIndexOf(C)
if(e>-1)this.pendingMarks.splice(e,1)
else{var t=this.top
t.activeMarks=C.removeFromSet(t.activeMarks)}},LC.currentPos.get=function(){this.closeExtra()
for(var C=0,e=this.open;e>=0;e--){for(var t=this.nodes[e].content,H=t.length-1;H>=0;H--)C+=t[H].nodeSize
e&&C++}return C},rC.prototype.findAtPoint=function(C,e){if(this.find)for(var t=0;t<this.find.length;t++)this.find[t].node==C&&this.find[t].offset==e&&(this.find[t].pos=this.currentPos)},rC.prototype.findInside=function(C){if(this.find)for(var e=0;e<this.find.length;e++)null==this.find[e].pos&&1==C.nodeType&&C.contains(this.find[e].node)&&(this.find[e].pos=this.currentPos)},rC.prototype.findAround=function(C,e,t){if(C!=e&&this.find)for(var H=0;H<this.find.length;H++){if(null==this.find[H].pos&&1==C.nodeType&&C.contains(this.find[H].node))e.compareDocumentPosition(this.find[H].node)&(t?2:4)&&(this.find[H].pos=this.currentPos)}},rC.prototype.findInText=function(C){if(this.find)for(var e=0;e<this.find.length;e++)this.find[e].node==C&&(this.find[e].pos=this.currentPos-(C.nodeValue.length-this.find[e].offset))},rC.prototype.matchesContext=function(C){var e=this
if(C.indexOf("|")>-1)return C.split(/\s*\|\s*/).some(this.matchesContext,this)
var t=C.split("/"),H=this.options.context,i=!(this.isOpen||H&&H.parent.type!=this.nodes[0].type),V=-(H?H.depth+1:0)+(i?0:1)
return function C(n,r){for(;n>=0;n--){var L=t[n]
if(""==L){if(n==t.length-1||0==n)continue
for(;r>=V;r--)if(C(n-1,r))return!0
return!1}var o=r>0||0==r&&i?e.nodes[r].type:H&&r>=V?H.node(r-V).type:null
if(!o||o.name!=L&&-1==o.groups.indexOf(L))return!1
r--}return!0}(t.length-1,this.open)},rC.prototype.textblockFromContext=function(){var C=this.options.context
if(C)for(var e=C.depth;e>=0;e--){var t=C.node(e).contentMatchAt(C.indexAfter(e)).defaultType
if(t&&t.isTextblock&&t.defaultAttrs)return t}for(var H in this.parser.schema.nodes){var i=this.parser.schema.nodes[H]
if(i.isTextblock&&i.defaultAttrs)return i}},Object.defineProperties(rC.prototype,LC)
var aC=function(C,e){this.nodes=C||{},this.marks=e||{}}
function MC(C){var e={}
for(var t in C){var H=C[t].spec.toDOM
H&&(e[t]=H)}return e}function lC(C){return C.document||window.document}aC.prototype.serializeFragment=function(C,e,t){var H=this
void 0===e&&(e={}),t||(t=lC(e).createDocumentFragment())
var i=t,V=null
return C.forEach(function(C){if(V||C.marks.length){V||(V=[])
for(var t=0,n=0;t<V.length&&n<C.marks.length;){var r=C.marks[n]
if(H.marks[r.type.name]){if(!r.eq(V[t])||!1===r.type.spec.spanning)break
t+=2,n++}else n++}for(;t<V.length;)i=V.pop(),V.pop()
for(;n<C.marks.length;){var L=C.marks[n++],o=H.serializeMark(L,C.isInline,e)
o&&(V.push(L,i),i.appendChild(o.dom),i=o.contentDOM||o.dom)}}i.appendChild(H.serializeNode(C,e))}),t},aC.prototype.serializeNode=function(C,e){void 0===e&&(e={})
var t=aC.renderSpec(lC(e),this.nodes[C.type.name](C)),H=t.dom,i=t.contentDOM
if(i){if(C.isLeaf)throw new RangeError("Content hole not allowed in a leaf node spec")
e.onContent?e.onContent(C,i,e):this.serializeFragment(C.content,e,i)}return H},aC.prototype.serializeNodeAndMarks=function(C,e){void 0===e&&(e={})
for(var t=this.serializeNode(C,e),H=C.marks.length-1;H>=0;H--){var i=this.serializeMark(C.marks[H],C.isInline,e)
i&&((i.contentDOM||i.dom).appendChild(t),t=i.dom)}return t},aC.prototype.serializeMark=function(C,e,t){void 0===t&&(t={})
var H=this.marks[C.type.name]
return H&&aC.renderSpec(lC(t),H(C,e))},aC.renderSpec=function(C,e){if("string"==typeof e)return{dom:C.createTextNode(e)}
if(null!=e.nodeType)return{dom:e}
var t=C.createElement(e[0]),H=null,i=e[1],V=1
if(i&&"object"==typeof i&&null==i.nodeType&&!Array.isArray(i))for(var n in V=2,i)null!=i[n]&&t.setAttribute(n,i[n])
for(var r=V;r<e.length;r++){var L=e[r]
if(0===L){if(r<e.length-1||r>V)throw new RangeError("Content hole must be the only child of its parent node")
return{dom:t,contentDOM:t}}var o=aC.renderSpec(C,L),s=o.dom,a=o.contentDOM
if(t.appendChild(s),a){if(H)throw new RangeError("Multiple content holes")
H=a}}return{dom:t,contentDOM:H}},aC.fromSchema=function(C){return C.cached.domSerializer||(C.cached.domSerializer=new aC(this.nodesFromSchema(C),this.marksFromSchema(C)))},aC.nodesFromSchema=function(C){var e=MC(C.nodes)
return e.text||(e.text=function(C){return C.text}),e},aC.marksFromSchema=function(C){return MC(C.marks)},e.Node=S,e.ResolvedPos=f,e.NodeRange=b,e.Fragment=i,e.Slice=a,e.ReplaceError=s,e.Mark=o,e.Schema=Y,e.NodeType=G,e.MarkType=J,e.ContentMatch=T,e.DOMParser=Q,e.DOMSerializer=aC})
VV(oV)
oV.Node,oV.ResolvedPos,oV.NodeRange,oV.Fragment,oV.Slice,oV.ReplaceError,oV.Mark
var sV=oV.Schema,aV=(oV.NodeType,oV.MarkType,oV.ContentMatch,oV.DOMParser,oV.DOMSerializer,nV(function(C,e){Object.defineProperty(e,"__esModule",{value:!0})
var t=65535,H=Math.pow(2,16)
function i(C){return C&t}var V=function(C,e,t){void 0===e&&(e=!1),void 0===t&&(t=null),this.pos=C,this.deleted=e,this.recover=t},n=function(C,e){void 0===e&&(e=!1),this.ranges=C,this.inverted=e}
n.prototype.recover=function(C){var e=0,V=i(C)
if(!this.inverted)for(var n=0;n<V;n++)e+=this.ranges[3*n+2]-this.ranges[3*n+1]
return this.ranges[3*V]+e+function(C){return(C-(C&t))/H}(C)},n.prototype.mapResult=function(C,e){return void 0===e&&(e=1),this._map(C,e,!1)},n.prototype.map=function(C,e){return void 0===e&&(e=1),this._map(C,e,!0)},n.prototype._map=function(C,e,t){for(var i=0,n=this.inverted?2:1,r=this.inverted?1:2,L=0;L<this.ranges.length;L+=3){var o=this.ranges[L]-(this.inverted?i:0)
if(o>C)break
var s=this.ranges[L+n],a=this.ranges[L+r],M=o+s
if(C<=M){var l=o+i+((s?C==o?-1:C==M?1:e:e)<0?0:a)
if(t)return l
var d=L/3+(C-o)*H
return new V(l,e<0?C!=o:C!=M,d)}i+=a-s}return t?C+i:new V(C+i)},n.prototype.touches=function(C,e){for(var t=0,H=i(e),V=this.inverted?2:1,n=this.inverted?1:2,r=0;r<this.ranges.length;r+=3){var L=this.ranges[r]-(this.inverted?t:0)
if(L>C)break
var o=this.ranges[r+V]
if(C<=L+o&&r==3*H)return!0
t+=this.ranges[r+n]-o}return!1},n.prototype.forEach=function(C){for(var e=this.inverted?2:1,t=this.inverted?1:2,H=0,i=0;H<this.ranges.length;H+=3){var V=this.ranges[H],n=V-(this.inverted?i:0),r=V+(this.inverted?0:i),L=this.ranges[H+e],o=this.ranges[H+t]
C(n,n+L,r,r+o),i+=o-L}},n.prototype.invert=function(){return new n(this.ranges,!this.inverted)},n.prototype.toString=function(){return(this.inverted?"-":"")+JSON.stringify(this.ranges)},n.offset=function(C){return 0==C?n.empty:new n(C<0?[0,-C,0]:[0,0,C])},n.empty=new n([])
var r=function(C,e,t,H){this.maps=C||[],this.from=t||0,this.to=null==H?this.maps.length:H,this.mirror=e}
function L(C){var e=Error.call(this,C)
return e.__proto__=L.prototype,e}r.prototype.slice=function(C,e){return void 0===C&&(C=0),void 0===e&&(e=this.maps.length),new r(this.maps,this.mirror,C,e)},r.prototype.copy=function(){return new r(this.maps.slice(),this.mirror&&this.mirror.slice(),this.from,this.to)},r.prototype.appendMap=function(C,e){this.to=this.maps.push(C),null!=e&&this.setMirror(this.maps.length-1,e)},r.prototype.appendMapping=function(C){for(var e=0,t=this.maps.length;e<C.maps.length;e++){var H=C.getMirror(e)
this.appendMap(C.maps[e],null!=H&&H<e?t+H:null)}},r.prototype.getMirror=function(C){if(this.mirror)for(var e=0;e<this.mirror.length;e++)if(this.mirror[e]==C)return this.mirror[e+(e%2?-1:1)]},r.prototype.setMirror=function(C,e){this.mirror||(this.mirror=[]),this.mirror.push(C,e)},r.prototype.appendMappingInverted=function(C){for(var e=C.maps.length-1,t=this.maps.length+C.maps.length;e>=0;e--){var H=C.getMirror(e)
this.appendMap(C.maps[e].invert(),null!=H&&H>e?t-H-1:null)}},r.prototype.invert=function(){var C=new r
return C.appendMappingInverted(this),C},r.prototype.map=function(C,e){if(void 0===e&&(e=1),this.mirror)return this._map(C,e,!0)
for(var t=this.from;t<this.to;t++)C=this.maps[t].map(C,e)
return C},r.prototype.mapResult=function(C,e){return void 0===e&&(e=1),this._map(C,e,!1)},r.prototype._map=function(C,e,t){for(var H=!1,i=null,n=this.from;n<this.to;n++){var r=this.maps[n],L=i&&i[n]
if(null!=L&&r.touches(C,L))C=r.recover(L)
else{var o=r.mapResult(C,e)
if(null!=o.recover){var s=this.getMirror(n)
if(null!=s&&s>n&&s<this.to){if(o.deleted){n=s,C=this.maps[s].recover(o.recover)
continue}(i||(i=Object.create(null)))[s]=o.recover}}o.deleted&&(H=!0),C=o.pos}}return t?C:new V(C,H)},L.prototype=Object.create(Error.prototype),L.prototype.constructor=L,L.prototype.name="TransformError"
var o=function(C){this.doc=C,this.steps=[],this.docs=[],this.mapping=new r},s={before:{},docChanged:{}}
function a(){throw new Error("Override me")}s.before.get=function(){return this.docs.length?this.docs[0]:this.doc},o.prototype.step=function(C){var e=this.maybeStep(C)
if(e.failed)throw new L(e.failed)
return this},o.prototype.maybeStep=function(C){var e=C.apply(this.doc)
return e.failed||this.addStep(C,e.doc),e},s.docChanged.get=function(){return this.steps.length>0},o.prototype.addStep=function(C,e){this.docs.push(this.doc),this.steps.push(C),this.mapping.appendMap(C.getMap()),this.doc=e},Object.defineProperties(o.prototype,s)
var M=Object.create(null),l=function(){}
l.prototype.apply=function(C){return a()},l.prototype.getMap=function(){return n.empty},l.prototype.invert=function(C){return a()},l.prototype.map=function(C){return a()},l.prototype.merge=function(C){return null},l.prototype.toJSON=function(){return a()},l.fromJSON=function(C,e){if(!e||!e.stepType)throw new RangeError("Invalid input for Step.fromJSON")
var t=M[e.stepType]
if(!t)throw new RangeError("No step type "+e.stepType+" defined")
return t.fromJSON(C,e)},l.jsonID=function(C,e){if(C in M)throw new RangeError("Duplicate use of step JSON ID "+C)
return M[C]=e,e.prototype.jsonID=C,e}
var d=function(C,e){this.doc=C,this.failed=e}
d.ok=function(C){return new d(C,null)},d.fail=function(C){return new d(null,C)},d.fromReplace=function(C,e,t,H){try{return d.ok(C.replace(e,t,H))}catch(i){if(i instanceof oV.ReplaceError)return d.fail(i.message)
throw i}}
var c=function(C){function e(e,t,H,i){C.call(this),this.from=e,this.to=t,this.slice=H,this.structure=!!i}return C&&(e.__proto__=C),e.prototype=Object.create(C&&C.prototype),e.prototype.constructor=e,e.prototype.apply=function(C){return this.structure&&h(C,this.from,this.to)?d.fail("Structure replace would overwrite content"):d.fromReplace(C,this.from,this.to,this.slice)},e.prototype.getMap=function(){return new n([this.from,this.to-this.from,this.slice.size])},e.prototype.invert=function(C){return new e(this.from,this.from+this.slice.size,C.slice(this.from,this.to))},e.prototype.map=function(C){var t=C.mapResult(this.from,1),H=C.mapResult(this.to,-1)
return t.deleted&&H.deleted?null:new e(t.pos,Math.max(t.pos,H.pos),this.slice)},e.prototype.merge=function(C){if(!(C instanceof e)||C.structure!=this.structure)return null
if(this.from+this.slice.size!=C.from||this.slice.openEnd||C.slice.openStart){if(C.to!=this.from||this.slice.openStart||C.slice.openEnd)return null
var t=this.slice.size+C.slice.size==0?oV.Slice.empty:new oV.Slice(C.slice.content.append(this.slice.content),C.slice.openStart,this.slice.openEnd)
return new e(C.from,this.to,t,this.structure)}var H=this.slice.size+C.slice.size==0?oV.Slice.empty:new oV.Slice(this.slice.content.append(C.slice.content),this.slice.openStart,C.slice.openEnd)
return new e(this.from,this.to+(C.to-C.from),H,this.structure)},e.prototype.toJSON=function(){var C={stepType:"replace",from:this.from,to:this.to}
return this.slice.size&&(C.slice=this.slice.toJSON()),this.structure&&(C.structure=!0),C},e.fromJSON=function(C,t){if("number"!=typeof t.from||"number"!=typeof t.to)throw new RangeError("Invalid input for ReplaceStep.fromJSON")
return new e(t.from,t.to,oV.Slice.fromJSON(C,t.slice),!!t.structure)},e}(l)
l.jsonID("replace",c)
var u=function(C){function e(e,t,H,i,V,n,r){C.call(this),this.from=e,this.to=t,this.gapFrom=H,this.gapTo=i,this.slice=V,this.insert=n,this.structure=!!r}return C&&(e.__proto__=C),e.prototype=Object.create(C&&C.prototype),e.prototype.constructor=e,e.prototype.apply=function(C){if(this.structure&&(h(C,this.from,this.gapFrom)||h(C,this.gapTo,this.to)))return d.fail("Structure gap-replace would overwrite content")
var e=C.slice(this.gapFrom,this.gapTo)
if(e.openStart||e.openEnd)return d.fail("Gap is not a flat range")
var t=this.slice.insertAt(this.insert,e.content)
return t?d.fromReplace(C,this.from,this.to,t):d.fail("Content does not fit in gap")},e.prototype.getMap=function(){return new n([this.from,this.gapFrom-this.from,this.insert,this.gapTo,this.to-this.gapTo,this.slice.size-this.insert])},e.prototype.invert=function(C){var t=this.gapTo-this.gapFrom
return new e(this.from,this.from+this.slice.size+t,this.from+this.insert,this.from+this.insert+t,C.slice(this.from,this.to).removeBetween(this.gapFrom-this.from,this.gapTo-this.from),this.gapFrom-this.from,this.structure)},e.prototype.map=function(C){var t=C.mapResult(this.from,1),H=C.mapResult(this.to,-1),i=C.map(this.gapFrom,-1),V=C.map(this.gapTo,1)
return t.deleted&&H.deleted||i<t.pos||V>H.pos?null:new e(t.pos,H.pos,i,V,this.slice,this.insert,this.structure)},e.prototype.toJSON=function(){var C={stepType:"replaceAround",from:this.from,to:this.to,gapFrom:this.gapFrom,gapTo:this.gapTo,insert:this.insert}
return this.slice.size&&(C.slice=this.slice.toJSON()),this.structure&&(C.structure=!0),C},e.fromJSON=function(C,t){if("number"!=typeof t.from||"number"!=typeof t.to||"number"!=typeof t.gapFrom||"number"!=typeof t.gapTo||"number"!=typeof t.insert)throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON")
return new e(t.from,t.to,t.gapFrom,t.gapTo,oV.Slice.fromJSON(C,t.slice),t.insert,!!t.structure)},e}(l)
function h(C,e,t){for(var H=C.resolve(e),i=t-e,V=H.depth;i>0&&V>0&&H.indexAfter(V)==H.node(V).childCount;)V--,i--
if(i>0)for(var n=H.node(V).maybeChild(H.indexAfter(V));i>0;){if(!n||n.isLeaf)return!0
n=n.firstChild,i--}return!1}function p(C,e,t){return(0==e||C.canReplace(e,C.childCount))&&(t==C.childCount||C.canReplace(0,t))}function m(C){return{type:C,attrs:null}}function f(C,e){return C&&e&&!C.isLeaf&&C.canAppend(e)}function g(C,e,t){var H=C.resolve(e)
if(H.parent.canReplaceWith(H.index(),H.index(),t))return e
if(0==H.parentOffset)for(var i=H.depth-1;i>=0;i--){var V=H.index(i)
if(H.node(i).canReplaceWith(V,V,t))return H.before(i+1)
if(V>0)return null}if(H.parentOffset==H.parent.content.size)for(var n=H.depth-1;n>=0;n--){var r=H.indexAfter(n)
if(H.node(n).canReplaceWith(r,r,t))return H.after(n+1)
if(r<H.node(n).childCount)return null}}function Z(C,e,t){for(var H=[],i=0;i<C.childCount;i++){var V=C.child(i)
V.content.size&&(V=V.copy(Z(V.content,e,V))),V.isInline&&(V=e(V,t,i)),H.push(V)}return oV.Fragment.fromArray(H)}l.jsonID("replaceAround",u),o.prototype.lift=function(C,e){for(var t=C.$from,H=C.$to,i=C.depth,V=t.before(i+1),n=H.after(i+1),r=V,L=n,o=oV.Fragment.empty,s=0,a=i,M=!1;a>e;a--)M||t.index(a)>0?(M=!0,o=oV.Fragment.from(t.node(a).copy(o)),s++):r--
for(var l=oV.Fragment.empty,d=0,c=i,h=!1;c>e;c--)h||H.after(c+1)<H.end(c)?(h=!0,l=oV.Fragment.from(H.node(c).copy(l)),d++):L++
return this.step(new u(r,L,V,n,new oV.Slice(o.append(l),s,d),o.size-s,!0))},o.prototype.wrap=function(C,e){for(var t=oV.Fragment.empty,H=e.length-1;H>=0;H--)t=oV.Fragment.from(e[H].type.create(e[H].attrs,t))
var i=C.start,V=C.end
return this.step(new u(i,V,i,V,new oV.Slice(t,0,0),e.length,!0))},o.prototype.setBlockType=function(C,e,t,H){var i=this
if(void 0===e&&(e=C),!t.isTextblock)throw new RangeError("Type given to setBlockType should be a textblock")
var V=this.steps.length
return this.doc.nodesBetween(C,e,function(C,e){if(C.isTextblock&&!C.hasMarkup(t,H)&&function(C,e,t){var H=C.resolve(e),i=H.index()
return H.parent.canReplaceWith(i,i+1,t)}(i.doc,i.mapping.slice(V).map(e),t)){i.clearIncompatible(i.mapping.slice(V).map(e,1),t)
var n=i.mapping.slice(V),r=n.map(e,1),L=n.map(e+C.nodeSize,1)
return i.step(new u(r,L,r+1,L-1,new oV.Slice(oV.Fragment.from(t.create(H,null,C.marks)),0,0),1,!0)),!1}}),this},o.prototype.setNodeMarkup=function(C,e,t,H){var i=this.doc.nodeAt(C)
if(!i)throw new RangeError("No node at given position")
e||(e=i.type)
var V=e.create(t,null,H||i.marks)
if(i.isLeaf)return this.replaceWith(C,C+i.nodeSize,V)
if(!e.validContent(i.content))throw new RangeError("Invalid content for node type "+e.name)
return this.step(new u(C,C+i.nodeSize,C+1,C+i.nodeSize-1,new oV.Slice(oV.Fragment.from(V),0,0),1,!0))},o.prototype.split=function(C,e,t){void 0===e&&(e=1)
for(var H=this.doc.resolve(C),i=oV.Fragment.empty,V=oV.Fragment.empty,n=H.depth,r=H.depth-e,L=e-1;n>r;n--,L--){i=oV.Fragment.from(H.node(n).copy(i))
var o=t&&t[L]
V=oV.Fragment.from(o?o.type.create(o.attrs,V):H.node(n).copy(V))}return this.step(new c(C,C,new oV.Slice(i.append(V),e,e,!0)))},o.prototype.join=function(C,e){void 0===e&&(e=1)
var t=new c(C-e,C+e,oV.Slice.empty,!0)
return this.step(t)}
var v=function(C){function e(e,t,H){C.call(this),this.from=e,this.to=t,this.mark=H}return C&&(e.__proto__=C),e.prototype=Object.create(C&&C.prototype),e.prototype.constructor=e,e.prototype.apply=function(C){var e=this,t=C.slice(this.from,this.to),H=C.resolve(this.from),i=H.node(H.sharedDepth(this.to)),V=new oV.Slice(Z(t.content,function(C,t){return t.type.allowsMarkType(e.mark.type)?C.mark(e.mark.addToSet(C.marks)):C},i),t.openStart,t.openEnd)
return d.fromReplace(C,this.from,this.to,V)},e.prototype.invert=function(){return new y(this.from,this.to,this.mark)},e.prototype.map=function(C){var t=C.mapResult(this.from,1),H=C.mapResult(this.to,-1)
return t.deleted&&H.deleted||t.pos>=H.pos?null:new e(t.pos,H.pos,this.mark)},e.prototype.merge=function(C){if(C instanceof e&&C.mark.eq(this.mark)&&this.from<=C.to&&this.to>=C.from)return new e(Math.min(this.from,C.from),Math.max(this.to,C.to),this.mark)},e.prototype.toJSON=function(){return{stepType:"addMark",mark:this.mark.toJSON(),from:this.from,to:this.to}},e.fromJSON=function(C,t){if("number"!=typeof t.from||"number"!=typeof t.to)throw new RangeError("Invalid input for AddMarkStep.fromJSON")
return new e(t.from,t.to,C.markFromJSON(t.mark))},e}(l)
l.jsonID("addMark",v)
var y=function(C){function e(e,t,H){C.call(this),this.from=e,this.to=t,this.mark=H}return C&&(e.__proto__=C),e.prototype=Object.create(C&&C.prototype),e.prototype.constructor=e,e.prototype.apply=function(C){var e=this,t=C.slice(this.from,this.to),H=new oV.Slice(Z(t.content,function(C){return C.mark(e.mark.removeFromSet(C.marks))}),t.openStart,t.openEnd)
return d.fromReplace(C,this.from,this.to,H)},e.prototype.invert=function(){return new v(this.from,this.to,this.mark)},e.prototype.map=function(C){var t=C.mapResult(this.from,1),H=C.mapResult(this.to,-1)
return t.deleted&&H.deleted||t.pos>=H.pos?null:new e(t.pos,H.pos,this.mark)},e.prototype.merge=function(C){if(C instanceof e&&C.mark.eq(this.mark)&&this.from<=C.to&&this.to>=C.from)return new e(Math.min(this.from,C.from),Math.max(this.to,C.to),this.mark)},e.prototype.toJSON=function(){return{stepType:"removeMark",mark:this.mark.toJSON(),from:this.from,to:this.to}},e.fromJSON=function(C,t){if("number"!=typeof t.from||"number"!=typeof t.to)throw new RangeError("Invalid input for RemoveMarkStep.fromJSON")
return new e(t.from,t.to,C.markFromJSON(t.mark))},e}(l)
function b(C,e,t,H){if(void 0===t&&(t=e),void 0===H&&(H=oV.Slice.empty),e==t&&!H.size)return null
var i=C.resolve(e),V=C.resolve(t)
if(S(i,V,H))return new c(e,t,H)
var n=function(C,e){var t=function C(e,t,H,i){var V=oV.Fragment.empty,n=0,r=H[t]
if(e.depth>t){var L=C(e,t+1,H,i||r)
n=L.openEnd+1,V=oV.Fragment.from(e.node(t+1).copy(L.content))}r&&(V=V.append(r.content),n=r.openEnd)
i&&(V=V.append(e.node(t).contentMatchAt(e.indexAfter(t)).fillBefore(oV.Fragment.empty,!0)),n=0)
return{content:V,openEnd:n}}(C,0,e,!1),H=t.content,i=t.openEnd
return new oV.Slice(H,C.depth,i||0)}(i,function(C,e){for(var t=new O(C),H=1;e.size&&H<=3;H++)e=t.placeSlice(e.content,e.openStart,e.openEnd,H)
for(;t.open.length;)t.closeNode()
return t.placed}(i,H)),r=w(i,V,n)
if(!r)return null
if(n.size!=r.size&&function(C,e,t){if(!e.parent.isTextblock)return!1
var H,i=t.openEnd?function(C,e){for(var t=1;t<e;t++)C=C.lastChild.content
return C.lastChild}(t.content,t.openEnd):C.node(C.depth-(t.openStart-t.openEnd))
if(!i.isTextblock)return!1
for(var V=e.index();V<e.parent.childCount;V++)if(!i.type.allowsMarks(e.parent.child(V).marks))return!1
t.openEnd?H=i.contentMatchAt(i.childCount):(H=i.contentMatchAt(i.childCount),t.size&&(H=H.matchFragment(t.content,t.openStart?1:0)))
return(H=H.matchFragment(e.parent.content,e.index()))&&H.validEnd}(i,V,n)){for(var L=V.depth,o=V.after(L);L>1&&o==V.end(--L);)++o
var s=w(i,C.resolve(o),n)
if(s)return new u(e,o,t,V.end(),s,n.size)}return r.size||e!=t?new c(e,t,r):null}function k(C,e,t,H,i,V,n){var r,L=C.childCount,o=L-(n>0?1:0),s=V<0?e:t.node(i)
r=V<0?s.contentMatchAt(o):1==L&&n>0?s.contentMatchAt(V?t.index(i):t.indexAfter(i)):s.contentMatchAt(t.indexAfter(i)).matchFragment(C,L>0&&V?1:0,o)
var a=H.node(i)
if(n>0&&i<H.depth){var M=a.content.cutByIndex(H.indexAfter(i)).addToStart(C.lastChild),l=r.fillBefore(M,!0)
if(l&&l.size&&V>0&&1==L&&(l=null),l){var d=k(C.lastChild.content,C.lastChild,t,H,i+1,1==L?V-1:-1,n-1)
if(d){var c=C.lastChild.copy(d)
return l.size?C.cutByIndex(0,L-1).append(l).addToEnd(c):C.replaceChild(L-1,c)}}}n>0&&(r=r.matchType((1==L&&V>0?t.node(i+1):C.lastChild).type))
var u=H.index(i)
if(u==a.childCount&&!a.type.compatibleContent(e.type))return null
for(var h=r.fillBefore(a.content,!0,u),p=u;h&&p<a.content.childCount;p++)s.type.allowsMarks(a.content.child(p).marks)||(h=null)
if(!h)return null
if(n>0){var m=function C(e,t,H,i,V){var n,r=e.content,L=r.childCount
n=V>=0?H.node(i).contentMatchAt(H.indexAfter(i)).matchFragment(r,V>0?1:0,L):e.contentMatchAt(L)
if(t>0){var o=C(r.lastChild,t-1,H,i+1,1==L?V-1:-1)
r=r.replaceChild(L-1,o)}return e.copy(r.append(n.fillBefore(oV.Fragment.empty,!0)))}(C.lastChild,n-1,t,i+1,1==L?V-1:-1)
C=C.replaceChild(L-1,m)}return C=C.append(h),H.depth>i&&(C=C.addToEnd(function C(e,t){var H=e.node(t)
var i=H.contentMatchAt(0).fillBefore(H.content,!0,e.index(t))
e.depth>t&&(i=i.addToEnd(C(e,t+1)))
return H.copy(i)}(H,i+1))),C}function w(C,e,t){var H=k(t.content,C.node(0),C,e,0,t.openStart,t.openEnd)
return H?function(C,e,t){for(;e>0&&t>0&&1==C.childCount;)C=C.firstChild.content,e--,t--
return new oV.Slice(C,e,t)}(H,t.openStart,e.depth):null}function S(C,e,t){return!t.openStart&&!t.openEnd&&C.start()==e.start()&&C.parent.canReplace(C.index(),e.index(),t.content)}l.jsonID("removeMark",y),o.prototype.addMark=function(C,e,t){var H=this,i=[],V=[],n=null,r=null
return this.doc.nodesBetween(C,e,function(H,L,o){if(H.isInline){var s=H.marks
if(!t.isInSet(s)&&o.type.allowsMarkType(t.type)){for(var a=Math.max(L,C),M=Math.min(L+H.nodeSize,e),l=t.addToSet(s),d=0;d<s.length;d++)s[d].isInSet(l)||(n&&n.to==a&&n.mark.eq(s[d])?n.to=M:i.push(n=new y(a,M,s[d])))
r&&r.to==a?r.to=M:V.push(r=new v(a,M,t))}}}),i.forEach(function(C){return H.step(C)}),V.forEach(function(C){return H.step(C)}),this},o.prototype.removeMark=function(C,e,t){var H=this
void 0===t&&(t=null)
var i=[],V=0
return this.doc.nodesBetween(C,e,function(H,n){if(H.isInline){V++
var r=null
if(t instanceof oV.MarkType){var L=t.isInSet(H.marks)
L&&(r=[L])}else t?t.isInSet(H.marks)&&(r=[t]):r=H.marks
if(r&&r.length)for(var o=Math.min(n+H.nodeSize,e),s=0;s<r.length;s++){for(var a=r[s],M=void 0,l=0;l<i.length;l++){var d=i[l]
d.step==V-1&&a.eq(i[l].style)&&(M=d)}M?(M.to=o,M.step=V):i.push({style:a,from:Math.max(n,C),to:o,step:V})}}}),i.forEach(function(C){return H.step(new y(C.from,C.to,C.style))}),this},o.prototype.clearIncompatible=function(C,e,t){void 0===t&&(t=e.contentMatch)
for(var H=this.doc.nodeAt(C),i=[],V=C+1,n=0;n<H.childCount;n++){var r=H.child(n),L=V+r.nodeSize,o=t.matchType(r.type,r.attrs)
if(o){t=o
for(var s=0;s<r.marks.length;s++)e.allowsMarkType(r.marks[s].type)||this.step(new y(V,L,r.marks[s]))}else i.push(new c(V,L,oV.Slice.empty))
V=L}if(!t.validEnd){var a=t.fillBefore(oV.Fragment.empty,!0)
this.replace(V,V,new oV.Slice(a,0,0))}for(var M=i.length-1;M>=0;M--)this.step(i[M])
return this},o.prototype.replace=function(C,e,t){void 0===e&&(e=C),void 0===t&&(t=oV.Slice.empty)
var H=b(this.doc,C,e,t)
return H&&this.step(H),this},o.prototype.replaceWith=function(C,e,t){return this.replace(C,e,new oV.Slice(oV.Fragment.from(t),0,0))},o.prototype.delete=function(C,e){return this.replace(C,e,oV.Slice.empty)},o.prototype.insert=function(C,e){return this.replaceWith(C,C,e)}
var O=function(C){this.open=[]
for(var e=0;e<=C.depth;e++){var t=C.node(e),H=t.contentMatchAt(C.indexAfter(e))
this.open.push({parent:t,match:H,content:oV.Fragment.empty,wrapper:!1,openEnd:0,depth:e})}this.placed=[]}
function x(C,e,t){var H=C.content
if(e>1){var i=x(C.firstChild,e-1,1==C.childCount?t-1:0)
H=C.content.replaceChild(0,i)}var V=C.type.contentMatch.fillBefore(H,0==t)
return C.copy(V.append(H))}function A(C,e,t,H,i){if(e<t){var V=C.firstChild
C=C.replaceChild(0,V.copy(A(V.content,e+1,t,H,V)))}return e>H&&(C=i.contentMatchAt(0).fillBefore(C,!0).append(C)),C}function T(C,e){for(var t=[],H=Math.min(C.depth,e.depth);H>=0;H--){var i=C.start(H)
if(i<C.pos-(C.depth-H)||e.end(H)>e.pos+(e.depth-H)||C.node(H).type.spec.isolating||e.node(H).type.spec.isolating)break
i==e.start(H)&&t.push(H)}return t}O.prototype.placeSlice=function(C,e,t,H,i){if(e>0){var V=C.firstChild,n=this.placeSlice(V.content,Math.max(0,e-1),t&&1==C.childCount?t-1:0,H,V)
n.content!=V.content&&(n.content.size?(C=C.replaceChild(0,V.copy(n.content)),e=n.openStart+1):(1==C.childCount&&(t=0),C=C.cutByIndex(1),e=0))}var r=this.placeContent(C,e,t,H,i)
if(H>2&&r.size&&0==e){for(var L=0;L<r.content.childCount;L++){var o=r.content.child(L)
this.placeContent(o.content,0,t&&L==r.content.childCount.length-1?t-1:0,H,o)}r=oV.Fragment.empty}return r},O.prototype.placeContent=function(C,e,t,H,i){for(var V=0;V<C.childCount;V++){for(var n=C.child(V),r=!1,L=V==C.childCount-1,o=this.open.length-1;o>=0;o--){var s=this.open[o],a=void 0
if(H>1&&(a=s.match.findWrapping(n.type))&&(!i||!a.length||a[a.length-1]!=i.type)){for(;this.open.length-1>o;)this.closeNode()
for(var M=0;M<a.length;M++)s.match=s.match.matchType(a[M]),o++,s={parent:a[M].create(),match:a[M].contentMatch,content:oV.Fragment.empty,wrapper:!0,openEnd:0,depth:o+M},this.open.push(s)}var l=s.match.matchType(n.type)
if(!l){var d=s.match.fillBefore(oV.Fragment.from(n))
if(!d){if(i&&s.match.matchType(i.type))break
continue}for(var c=0;c<d.childCount;c++){var u=d.child(c)
this.addNode(s,u,0),l=s.match.matchFragment(u)}}for(;this.open.length-1>o;)this.closeNode()
n=n.mark(s.parent.type.allowedMarks(n.marks)),e&&(n=x(n,e,L?t:0),e=0),this.addNode(s,n,L?t:0),s.match=l,L&&(t=0),r=!0
break}if(!r)break}return this.open.length>1&&(V>0&&V==C.childCount||i&&this.open[this.open.length-1].parent.type==i.type)&&this.closeNode(),new oV.Slice(C.cutByIndex(V),e,t)},O.prototype.addNode=function(C,e,t){var H,i
C.content=(H=C.content,i=C.openEnd,i?H.replaceChild(H.childCount-1,function C(e,t){var H=e.content
if(t>1){var i=C(e.lastChild,t-1)
H=e.content.replaceChild(e.childCount-1,i)}var V=e.contentMatchAt(e.childCount).fillBefore(oV.Fragment.empty,!0)
return e.copy(H.append(V))}(H.lastChild,i)):H).addToEnd(e),C.openEnd=t},O.prototype.closeNode=function(){var C=this.open.pop()
0==C.content.size||(C.wrapper?this.addNode(this.open[this.open.length-1],C.parent.copy(C.content),C.openEnd+1):this.placed[C.depth]={depth:C.depth,content:C.content,openEnd:C.openEnd})},o.prototype.replaceRange=function(C,e,t){if(!t.size)return this.deleteRange(C,e)
var H=this.doc.resolve(C),i=this.doc.resolve(e)
if(S(H,i,t))return this.step(new c(C,e,t))
var V=T(H,this.doc.resolve(e))
0==V[V.length-1]&&V.pop()
var n=-(H.depth+1)
V.unshift(n)
for(var r=H.depth,L=H.pos-1;r>0;r--,L--){var o=H.node(r).type.spec
if(o.defining||o.isolating)break
V.indexOf(r)>-1?n=r:H.before(r)==L&&V.splice(1,0,-r)}for(var s=V.indexOf(n),a=[],M=t.openStart,l=t.content,d=0;;d++){var u=l.firstChild
if(a.push(u),d==t.openStart)break
l=u.content}M>0&&a[M-1].type.spec.defining&&H.node(s).type!=a[M-1].type?M-=1:M>=2&&a[M-1].isTextblock&&a[M-2].type.spec.defining&&H.node(s).type!=a[M-2].type&&(M-=2)
for(var h=t.openStart;h>=0;h--){var p=(h+M+1)%(t.openStart+1),m=a[p]
if(m)for(var f=0;f<V.length;f++){var g=V[(f+s)%V.length],Z=!0
g<0&&(Z=!1,g=-g)
var v=H.node(g-1),y=H.index(g-1)
if(v.canReplaceWith(y,y,m.type,m.marks))return this.replace(H.before(g),Z?i.after(g):e,new oV.Slice(A(t.content,0,t.openStart,p),p,t.openEnd))}}return this.replace(C,e,t)},o.prototype.replaceRangeWith=function(C,e,t){if(!t.isInline&&C==e&&this.doc.resolve(C).parent.content.size){var H=g(this.doc,C,t.type)
null!=H&&(C=e=H)}return this.replaceRange(C,e,new oV.Slice(oV.Fragment.from(t),0,0))},o.prototype.deleteRange=function(C,e){for(var t=this.doc.resolve(C),H=this.doc.resolve(e),i=T(t,H),V=0;V<i.length;V++){var n=i[V],r=V==i.length-1
if(r&&0==n||t.node(n).type.contentMatch.validEnd)return this.delete(t.start(n),H.end(n))
if(n>0&&(r||t.node(n-1).canReplace(t.index(n-1),H.indexAfter(n-1))))return this.delete(t.before(n),H.after(n))}for(var L=1;L<=t.depth;L++)if(C-t.start(L)==t.depth-L&&e>t.end(L))return this.delete(t.before(L),e)
return this.delete(C,e)},e.Transform=o,e.TransformError=L,e.Step=l,e.StepResult=d,e.joinPoint=function(C,e,t){void 0===t&&(t=-1)
for(var H=C.resolve(e),i=H.depth;;i--){var V=void 0,n=void 0
if(i==H.depth?(V=H.nodeBefore,n=H.nodeAfter):t>0?(V=H.node(i+1),n=H.node(i).maybeChild(H.index(i)+1)):(V=H.node(i).maybeChild(H.index(i)-1),n=H.node(i+1)),V&&!V.isTextblock&&f(V,n))return e
if(0==i)break
e=t<0?H.before(i):H.after(i)}},e.canJoin=function(C,e){var t=C.resolve(e),H=t.index()
return f(t.nodeBefore,t.nodeAfter)&&t.parent.canReplace(H,H+1)},e.canSplit=function(C,e,t,H){void 0===t&&(t=1)
var i=C.resolve(e),V=i.depth-t,n=H&&H[H.length-1]||i.parent
if(V<0||i.parent.type.spec.isolating||!i.parent.canReplace(i.index(),i.parent.childCount)||!n.type.validContent(i.parent.content.cutByIndex(i.index(),i.parent.childCount)))return!1
for(var r=i.depth-1,L=t-2;r>V;r--,L--){var o=i.node(r),s=i.index(r)
if(o.type.spec.isolating)return!1
var a=o.content.cutByIndex(s,o.childCount),M=H&&H[L]||o
if(M!=o&&(a=a.replaceChild(0,M.type.create(M.attrs))),!o.canReplace(s+1,o.childCount)||!M.type.validContent(a))return!1}var l=i.indexAfter(V),d=H&&H[0]
return i.node(V).canReplaceWith(l,l,d?d.type:i.node(V+1).type)},e.insertPoint=g,e.dropPoint=function(C,e,t){var H=C.resolve(e)
if(!t.content.size)return e
for(var i=t.content,V=0;V<t.openStart;V++)i=i.firstChild.content
for(var n=1;n<=(0==t.openStart&&t.size?2:1);n++)for(var r=H.depth;r>=0;r--){var L=r==H.depth?0:H.pos<=(H.start(r+1)+H.end(r+1))/2?-1:1,o=H.index(r)+(L>0?1:0)
if(1==n?H.node(r).canReplace(o,o,i):H.node(r).contentMatchAt(o).findWrapping(i.firstChild.type))return 0==L?H.pos:L<0?H.before(r+1):H.after(r+1)}return null},e.liftTarget=function(C){for(var e=C.parent.content.cutByIndex(C.startIndex,C.endIndex),t=C.depth;;--t){var H=C.$from.node(t),i=C.$from.index(t),V=C.$to.indexAfter(t)
if(t<C.depth&&H.canReplace(i,V,e))return t
if(0==t||H.type.spec.isolating||!p(H,i,V))break}},e.findWrapping=function(C,e,t,H){void 0===H&&(H=C)
var i=function(C,e){var t=C.parent,H=C.startIndex,i=C.endIndex,V=t.contentMatchAt(H).findWrapping(e)
if(!V)return null
var n=V.length?V[0]:e
return t.canReplaceWith(H,i,n)?V:null}(C,e),V=i&&function(C,e){var t=C.parent,H=C.startIndex,i=C.endIndex,V=t.child(H),n=e.contentMatch.findWrapping(V.type)
if(!n)return null
for(var r=(n.length?n[n.length-1]:e).contentMatch,L=H;r&&L<i;L++)r=r.matchType(t.child(L).type)
return r&&r.validEnd?n:null}(H,e)
return V?i.map(m).concat({type:e,attrs:t}).concat(V.map(m)):null},e.StepMap=n,e.MapResult=V,e.Mapping=r,e.AddMarkStep=v,e.RemoveMarkStep=y,e.ReplaceStep=c,e.ReplaceAroundStep=u,e.replaceStep=b}))
VV(aV)
aV.Transform,aV.TransformError
var MV=aV.Step,lV=aV.StepResult,dV=(aV.joinPoint,aV.canJoin,aV.canSplit,aV.insertPoint,aV.dropPoint,aV.liftTarget,aV.findWrapping,aV.StepMap,aV.MapResult,aV.Mapping,aV.AddMarkStep,aV.RemoveMarkStep,aV.ReplaceStep,aV.ReplaceAroundStep,aV.replaceStep,nV(function(C,e){Object.defineProperty(e,"__esModule",{value:!0})
var t=Object.create(null),H=function(C,e,t){this.ranges=t||[new V(C.min(e),C.max(e))],this.$anchor=C,this.$head=e},i={anchor:{},head:{},from:{},to:{},$from:{},$to:{},empty:{}}
i.anchor.get=function(){return this.$anchor.pos},i.head.get=function(){return this.$head.pos},i.from.get=function(){return this.$from.pos},i.to.get=function(){return this.$to.pos},i.$from.get=function(){return this.ranges[0].$from},i.$to.get=function(){return this.ranges[0].$to},i.empty.get=function(){for(var C=this.ranges,e=0;e<C.length;e++)if(C[e].$from.pos!=C[e].$to.pos)return!1
return!0},H.prototype.content=function(){return this.$from.node(0).slice(this.from,this.to,!0)},H.prototype.replace=function(C,e){void 0===e&&(e=oV.Slice.empty)
for(var t=e.content.lastChild,H=null,i=0;i<e.openEnd;i++)H=t,t=t.lastChild
for(var V=C.steps.length,n=this.ranges,r=0;r<n.length;r++){var L=n[r],o=L.$from,s=L.$to,a=C.mapping.slice(V)
C.replaceRange(a.map(o.pos),a.map(s.pos),r?oV.Slice.empty:e),0==r&&l(C,V,(t?t.isInline:H&&H.isTextblock)?-1:1)}},H.prototype.replaceWith=function(C,e){for(var t=C.steps.length,H=this.ranges,i=0;i<H.length;i++){var V=H[i],n=V.$from,r=V.$to,L=C.mapping.slice(t),o=L.map(n.pos),s=L.map(r.pos)
i?C.deleteRange(o,s):(C.replaceRangeWith(o,s,e),l(C,t,e.isInline?-1:1))}},H.findFrom=function(C,e,t){var H=C.parent.inlineContent?new n(C):M(C.node(0),C.parent,C.pos,C.index(),e,t)
if(H)return H
for(var i=C.depth-1;i>=0;i--){var V=e<0?M(C.node(0),C.node(i),C.before(i+1),C.index(i),e,t):M(C.node(0),C.node(i),C.after(i+1),C.index(i)+1,e,t)
if(V)return V}},H.near=function(C,e){return void 0===e&&(e=1),this.findFrom(C,e)||this.findFrom(C,-e)||new s(C.node(0))},H.atStart=function(C){return M(C,C,0,0,1)||new s(C)},H.atEnd=function(C){return M(C,C,C.content.size,C.childCount,-1)||new s(C)},H.fromJSON=function(C,e){if(!e||!e.type)throw new RangeError("Invalid input for Selection.fromJSON")
var H=t[e.type]
if(!H)throw new RangeError("No selection type "+e.type+" defined")
return H.fromJSON(C,e)},H.jsonID=function(C,e){if(C in t)throw new RangeError("Duplicate use of selection JSON ID "+C)
return t[C]=e,e.prototype.jsonID=C,e},H.prototype.getBookmark=function(){return n.between(this.$anchor,this.$head).getBookmark()},Object.defineProperties(H.prototype,i),H.prototype.visible=!0
var V=function(C,e){this.$from=C,this.$to=e},n=function(C){function e(e,t){void 0===t&&(t=e),C.call(this,e,t)}C&&(e.__proto__=C),e.prototype=Object.create(C&&C.prototype),e.prototype.constructor=e
var t={$cursor:{}}
return t.$cursor.get=function(){return this.$anchor.pos==this.$head.pos?this.$head:null},e.prototype.map=function(t,H){var i=t.resolve(H.map(this.head))
if(!i.parent.inlineContent)return C.near(i)
var V=t.resolve(H.map(this.anchor))
return new e(V.parent.inlineContent?V:i,i)},e.prototype.replace=function(e,t){if(void 0===t&&(t=oV.Slice.empty),C.prototype.replace.call(this,e,t),t==oV.Slice.empty){var H=this.$from.marksAcross(this.$to)
H&&e.ensureMarks(H)}},e.prototype.eq=function(C){return C instanceof e&&C.anchor==this.anchor&&C.head==this.head},e.prototype.getBookmark=function(){return new r(this.anchor,this.head)},e.prototype.toJSON=function(){return{type:"text",anchor:this.anchor,head:this.head}},e.fromJSON=function(C,t){if("number"!=typeof t.anchor||"number"!=typeof t.head)throw new RangeError("Invalid input for TextSelection.fromJSON")
return new e(C.resolve(t.anchor),C.resolve(t.head))},e.create=function(C,e,t){void 0===t&&(t=e)
var H=C.resolve(e)
return new this(H,t==e?H:C.resolve(t))},e.between=function(t,H,i){var V=t.pos-H.pos
if(i&&!V||(i=V>=0?1:-1),!H.parent.inlineContent){var n=C.findFrom(H,i,!0)||C.findFrom(H,-i,!0)
if(!n)return C.near(H,i)
H=n.$head}return t.parent.inlineContent||(0==V?t=H:(t=(C.findFrom(t,-i,!0)||C.findFrom(t,i,!0)).$anchor).pos<H.pos!=V<0&&(t=H)),new e(t,H)},Object.defineProperties(e.prototype,t),e}(H)
H.jsonID("text",n)
var r=function(C,e){this.anchor=C,this.head=e}
r.prototype.map=function(C){return new r(C.map(this.anchor),C.map(this.head))},r.prototype.resolve=function(C){return n.between(C.resolve(this.anchor),C.resolve(this.head))}
var L=function(C){function e(e){var t=e.nodeAfter,H=e.node(0).resolve(e.pos+t.nodeSize)
C.call(this,e,H),this.node=t}return C&&(e.__proto__=C),e.prototype=Object.create(C&&C.prototype),e.prototype.constructor=e,e.prototype.map=function(t,H){var i=H.mapResult(this.anchor),V=i.deleted,n=i.pos,r=t.resolve(n)
return V?C.near(r):new e(r)},e.prototype.content=function(){return new oV.Slice(oV.Fragment.from(this.node),0,0)},e.prototype.eq=function(C){return C instanceof e&&C.anchor==this.anchor},e.prototype.toJSON=function(){return{type:"node",anchor:this.anchor}},e.prototype.getBookmark=function(){return new o(this.anchor)},e.fromJSON=function(C,t){if("number"!=typeof t.anchor)throw new RangeError("Invalid input for NodeSelection.fromJSON")
return new e(C.resolve(t.anchor))},e.create=function(C,e){return new this(C.resolve(e))},e.isSelectable=function(C){return!C.isText&&!1!==C.type.spec.selectable},e}(H)
L.prototype.visible=!1,H.jsonID("node",L)
var o=function(C){this.anchor=C}
o.prototype.map=function(C){var e=C.mapResult(this.anchor),t=e.deleted,H=e.pos
return t?new r(H,H):new o(H)},o.prototype.resolve=function(C){var e=C.resolve(this.anchor),t=e.nodeAfter
return t&&L.isSelectable(t)?new L(e):H.near(e)}
var s=function(C){function e(e){C.call(this,e.resolve(0),e.resolve(e.content.size))}return C&&(e.__proto__=C),e.prototype=Object.create(C&&C.prototype),e.prototype.constructor=e,e.prototype.toJSON=function(){return{type:"all"}},e.fromJSON=function(C){return new e(C)},e.prototype.map=function(C){return new e(C)},e.prototype.eq=function(C){return C instanceof e},e.prototype.getBookmark=function(){return a},e}(H)
H.jsonID("all",s)
var a={map:function(){return this},resolve:function(C){return new s(C)}}
function M(C,e,t,H,i,V){if(e.inlineContent)return n.create(C,t)
for(var r=H-(i>0?0:1);i>0?r<e.childCount:r>=0;r+=i){var o=e.child(r)
if(o.isAtom){if(!V&&L.isSelectable(o))return L.create(C,t-(i<0?o.nodeSize:0))}else{var s=M(C,o,t+i,i<0?o.childCount:0,i,V)
if(s)return s}t+=o.nodeSize*i}}function l(C,e,t){var i=C.steps.length-1
if(!(i<e)){var V,n=C.steps[i]
if(n instanceof aV.ReplaceStep||n instanceof aV.ReplaceAroundStep)C.mapping.maps[i].forEach(function(C,e,t,H){null==V&&(V=H)}),C.setSelection(H.near(C.doc.resolve(V),t))}}var d=function(C){function e(e){C.call(this,e.doc),this.time=Date.now(),this.curSelection=e.selection,this.curSelectionFor=0,this.storedMarks=e.storedMarks,this.updated=0,this.meta=Object.create(null)}C&&(e.__proto__=C),e.prototype=Object.create(C&&C.prototype),e.prototype.constructor=e
var t={selection:{},selectionSet:{},storedMarksSet:{},isGeneric:{},scrolledIntoView:{}}
return t.selection.get=function(){return this.curSelectionFor<this.steps.length&&(this.curSelection=this.curSelection.map(this.doc,this.mapping.slice(this.curSelectionFor)),this.curSelectionFor=this.steps.length),this.curSelection},e.prototype.setSelection=function(C){return this.curSelection=C,this.curSelectionFor=this.steps.length,this.updated=-3&(1|this.updated),this.storedMarks=null,this},t.selectionSet.get=function(){return(1&this.updated)>0},e.prototype.setStoredMarks=function(C){return this.storedMarks=C,this.updated|=2,this},e.prototype.ensureMarks=function(C){return oV.Mark.sameSet(this.storedMarks||this.selection.$from.marks(),C)||this.setStoredMarks(C),this},e.prototype.addStoredMark=function(C){return this.ensureMarks(C.addToSet(this.storedMarks||this.selection.$head.marks()))},e.prototype.removeStoredMark=function(C){return this.ensureMarks(C.removeFromSet(this.storedMarks||this.selection.$head.marks()))},t.storedMarksSet.get=function(){return(2&this.updated)>0},e.prototype.addStep=function(e,t){C.prototype.addStep.call(this,e,t),this.updated=-3&this.updated,this.storedMarks=null},e.prototype.setTime=function(C){return this.time=C,this},e.prototype.replaceSelection=function(C){return this.selection.replace(this,C),this},e.prototype.replaceSelectionWith=function(C,e){var t=this.selection
return!1!==e&&(C=C.mark(this.storedMarks||(t.empty?t.$from.marks():t.$from.marksAcross(t.$to)||oV.Mark.none))),t.replaceWith(this,C),this},e.prototype.deleteSelection=function(){return this.selection.replace(this),this},e.prototype.insertText=function(C,e,t){void 0===t&&(t=e)
var H=this.doc.type.schema
if(null==e)return C?this.replaceSelectionWith(H.text(C),!0):this.deleteSelection()
if(!C)return this.deleteRange(e,t)
var i=this.storedMarks
if(!i){var V=this.doc.resolve(e)
i=t==e?V.marks():V.marksAcross(this.doc.resolve(t))}return this.replaceRangeWith(e,t,H.text(C,i))},e.prototype.setMeta=function(C,e){return this.meta["string"==typeof C?C:C.key]=e,this},e.prototype.getMeta=function(C){return this.meta["string"==typeof C?C:C.key]},t.isGeneric.get=function(){for(var C in this.meta)return!1
return!0},e.prototype.scrollIntoView=function(){return this.updated|=4,this},t.scrolledIntoView.get=function(){return(4&this.updated)>0},Object.defineProperties(e.prototype,t),e}(aV.Transform)
function c(C,e){return e&&C?C.bind(e):C}var u=function(C,e,t){this.name=C,this.init=c(e.init,t),this.apply=c(e.apply,t)},h=[new u("doc",{init:function(C){return C.doc||C.schema.topNodeType.createAndFill()},apply:function(C){return C.doc}}),new u("selection",{init:function(C,e){return C.selection||H.atStart(e.doc)},apply:function(C){return C.selection}}),new u("storedMarks",{init:function(C){return C.storedMarks||null},apply:function(C,e,t,H){return H.selection.$cursor?C.storedMarks:null}}),new u("scrollToSelection",{init:function(){return 0},apply:function(C,e){return C.scrolledIntoView?e+1:e}})],p=function(C,e){var t=this
this.schema=C,this.fields=h.concat(),this.plugins=[],this.pluginsByKey=Object.create(null),e&&e.forEach(function(C){if(t.pluginsByKey[C.key])throw new RangeError("Adding different instances of a keyed plugin ("+C.key+")")
t.plugins.push(C),t.pluginsByKey[C.key]=C,C.spec.state&&t.fields.push(new u(C.key,C.spec.state,C))})},m=function(C){this.config=C},f={schema:{},plugins:{},tr:{}}
f.schema.get=function(){return this.config.schema},f.plugins.get=function(){return this.config.plugins},m.prototype.apply=function(C){return this.applyTransaction(C).state},m.prototype.filterTransaction=function(C,e){void 0===e&&(e=-1)
for(var t=0;t<this.config.plugins.length;t++)if(t!=e){var H=this.config.plugins[t]
if(H.spec.filterTransaction&&!H.spec.filterTransaction.call(H,C,this))return!1}return!0},m.prototype.applyTransaction=function(C){if(!this.filterTransaction(C))return{state:this,transactions:[]}
for(var e=[C],t=this.applyInner(C),H=null;;){for(var i=!1,V=0;V<this.config.plugins.length;V++){var n=this.config.plugins[V]
if(n.spec.appendTransaction){var r=H?H[V].n:0,L=H?H[V].state:this,o=r<e.length&&n.spec.appendTransaction.call(n,r?e.slice(r):e,L,t)
if(o&&t.filterTransaction(o,V)){if(o.setMeta("appendedTransaction",C),!H){H=[]
for(var s=0;s<this.config.plugins.length;s++)H.push(s<V?{state:t,n:e.length}:{state:this,n:0})}e.push(o),t=t.applyInner(o),i=!0}H&&(H[V]={state:t,n:e.length})}}if(!i)return{state:t,transactions:e}}},m.prototype.applyInner=function(C){if(!C.before.eq(this.doc))throw new RangeError("Applying a mismatched transaction")
for(var e=new m(this.config),t=this.config.fields,H=0;H<t.length;H++){var i=t[H]
e[i.name]=i.apply(C,this[i.name],this,e)}for(var V=0;V<g.length;V++)g[V](this,C,e)
return e},f.tr.get=function(){return new d(this)},m.create=function(C){for(var e=new p(C.schema||C.doc.type.schema,C.plugins),t=new m(e),H=0;H<e.fields.length;H++)t[e.fields[H].name]=e.fields[H].init(C,t)
return t},m.prototype.reconfigure=function(C){for(var e=new p(C.schema||this.schema,C.plugins),t=e.fields,H=new m(e),i=0;i<t.length;i++){var V=t[i].name
H[V]=this.hasOwnProperty(V)?this[V]:t[i].init(C,H)}return H},m.prototype.toJSON=function(C){var e={doc:this.doc.toJSON(),selection:this.selection.toJSON()}
if(this.storedMarks&&(e.storedMarks=this.storedMarks.map(function(C){return C.toJSON()})),C&&"object"==typeof C)for(var t in C){if("doc"==t||"selection"==t)throw new RangeError("The JSON fields `doc` and `selection` are reserved")
var H=C[t],i=H.spec.state
i&&i.toJSON&&(e[t]=i.toJSON.call(H,this[H.key]))}return e},m.fromJSON=function(C,e,t){if(!e)throw new RangeError("Invalid input for EditorState.fromJSON")
if(!C.schema)throw new RangeError("Required config field 'schema' missing")
var i=new p(C.schema,C.plugins),V=new m(i)
return i.fields.forEach(function(i){if("doc"==i.name)V.doc=oV.Node.fromJSON(C.schema,e.doc)
else if("selection"==i.name)V.selection=H.fromJSON(V.doc,e.selection)
else if("storedMarks"==i.name)e.storedMarks&&(V.storedMarks=e.storedMarks.map(C.schema.markFromJSON))
else{if(t)for(var n in t){var r=t[n],L=r.spec.state
if(r.key==i.name&&L&&L.fromJSON&&Object.prototype.hasOwnProperty.call(e,n))return void(V[i.name]=L.fromJSON.call(r,C,e[n],V))}V[i.name]=i.init(C,V)}}),V},m.addApplyListener=function(C){g.push(C)},m.removeApplyListener=function(C){var e=g.indexOf(C)
e>-1&&g.splice(e,1)},Object.defineProperties(m.prototype,f)
var g=[]
var Z=function(C){this.props={},C.props&&function C(e,t,H){for(var i in e){var V=e[i]
V instanceof Function?V=V.bind(t):"handleDOMEvents"==i&&(V=C(V,t,{})),H[i]=V}return H}(C.props,this,this.props),this.spec=C,this.key=C.key?C.key.key:y("plugin")}
Z.prototype.getState=function(C){return C[this.key]}
var v=Object.create(null)
function y(C){return C in v?C+"$"+ ++v[C]:(v[C]=0,C+"$")}var b=function(C){void 0===C&&(C="key"),this.key=y(C)}
b.prototype.get=function(C){return C.config.pluginsByKey[this.key]},b.prototype.getState=function(C){return C[this.key]},e.Selection=H,e.SelectionRange=V,e.TextSelection=n,e.NodeSelection=L,e.AllSelection=s,e.Transaction=d,e.EditorState=m,e.Plugin=Z,e.PluginKey=b}))
VV(dV)
dV.Selection,dV.SelectionRange,dV.TextSelection,dV.NodeSelection,dV.AllSelection,dV.Transaction
var cV=dV.EditorState,uV=(dV.Plugin,dV.PluginKey,nV(function(C,e){function t(C,e){return!C.selection.empty&&(e&&e(C.tr.deleteSelection().scrollIntoView()),!0)}function H(C,e,t){var H=C.selection.$cursor
if(!H||(t?!t.endOfTextblock("backward",C):H.parentOffset>0))return!1
var V=n(H)
if(!V){var r=H.blockRange(),L=r&&aV.liftTarget(r)
return null!=L&&(e&&e(C.tr.lift(r,L).scrollIntoView()),!0)}var o=V.nodeBefore
if(!o.type.spec.isolating&&u(C,V,e))return!0
if(0==H.parent.content.size&&(i(o,"end")||dV.NodeSelection.isSelectable(o))){if(e){var s=C.tr.deleteRange(H.before(),H.after())
s.setSelection(i(o,"end")?dV.Selection.findFrom(s.doc.resolve(s.mapping.map(V.pos,-1)),-1):dV.NodeSelection.create(s.doc,V.pos-o.nodeSize)),e(s.scrollIntoView())}return!0}return!(!o.isAtom||V.depth!=H.depth-1)&&(e&&e(C.tr.delete(V.pos-o.nodeSize,V.pos).scrollIntoView()),!0)}function i(C,e){for(;C;C="start"==e?C.firstChild:C.lastChild)if(C.isTextblock)return!0
return!1}function V(C,e,t){var H=C.selection.$cursor
if(!H||(t?!t.endOfTextblock("backward",C):H.parentOffset>0))return!1
var i=n(H),V=i&&i.nodeBefore
return!(!V||!dV.NodeSelection.isSelectable(V))&&(e&&e(C.tr.setSelection(dV.NodeSelection.create(C.doc,i.pos-V.nodeSize)).scrollIntoView()),!0)}function n(C){if(!C.parent.type.spec.isolating)for(var e=C.depth-1;e>=0;e--){if(C.index(e)>0)return C.doc.resolve(C.before(e+1))
if(C.node(e).type.spec.isolating)break}return null}function r(C,e,t){var H=C.selection.$cursor
if(!H||(t?!t.endOfTextblock("forward",C):H.parentOffset<H.parent.content.size))return!1
var V=o(H)
if(!V)return!1
var n=V.nodeAfter
if(u(C,V,e))return!0
if(0==H.parent.content.size&&(i(n,"start")||dV.NodeSelection.isSelectable(n))){if(e){var r=C.tr.deleteRange(H.before(),H.after())
r.setSelection(i(n,"start")?dV.Selection.findFrom(r.doc.resolve(r.mapping.map(V.pos)),1):dV.NodeSelection.create(r.doc,r.mapping.map(V.pos))),e(r.scrollIntoView())}return!0}return!(!n.isAtom||V.depth!=H.depth-1)&&(e&&e(C.tr.delete(V.pos,V.pos+n.nodeSize).scrollIntoView()),!0)}function L(C,e,t){var H=C.selection.$cursor
if(!H||(t?!t.endOfTextblock("forward",C):H.parentOffset<H.parent.content.size))return!1
var i=o(H),V=i&&i.nodeAfter
return!(!V||!dV.NodeSelection.isSelectable(V))&&(e&&e(C.tr.setSelection(dV.NodeSelection.create(C.doc,i.pos)).scrollIntoView()),!0)}function o(C){if(!C.parent.type.spec.isolating)for(var e=C.depth-1;e>=0;e--){var t=C.node(e)
if(C.index(e)+1<t.childCount)return C.doc.resolve(C.after(e+1))
if(t.type.spec.isolating)break}return null}function s(C,e){var t=C.selection,H=t.$head,i=t.$anchor
return!(!H.parent.type.spec.code||!H.sameParent(i))&&(e&&e(C.tr.insertText("\n").scrollIntoView()),!0)}function a(C,e){var t=C.selection,H=t.$head,i=t.$anchor
if(!H.parent.type.spec.code||!H.sameParent(i))return!1
var V=H.node(-1),n=H.indexAfter(-1),r=V.contentMatchAt(n).defaultType
if(!V.canReplaceWith(n,n,r))return!1
if(e){var L=H.after(),o=C.tr.replaceWith(L,L,r.createAndFill())
o.setSelection(dV.Selection.near(o.doc.resolve(L),1)),e(o.scrollIntoView())}return!0}function M(C,e){var t=C.selection,H=t.$from,i=t.$to
if(H.parent.inlineContent||i.parent.inlineContent)return!1
var V=H.parent.contentMatchAt(i.indexAfter()).defaultType
if(!V||!V.isTextblock)return!1
if(e){var n=(!H.parentOffset&&i.index()<i.parent.childCount?H:i).pos,r=C.tr.insert(n,V.createAndFill())
r.setSelection(dV.TextSelection.create(r.doc,n+1)),e(r.scrollIntoView())}return!0}function l(C,e){var t=C.selection.$cursor
if(!t||t.parent.content.size)return!1
if(t.depth>1&&t.after()!=t.end(-1)){var H=t.before()
if(aV.canSplit(C.doc,H))return e&&e(C.tr.split(H).scrollIntoView()),!0}var i=t.blockRange(),V=i&&aV.liftTarget(i)
return null!=V&&(e&&e(C.tr.lift(i,V).scrollIntoView()),!0)}function d(C,e){var t=C.selection,H=t.$from,i=t.$to
if(C.selection instanceof dV.NodeSelection&&C.selection.node.isBlock)return!(!H.parentOffset||!aV.canSplit(C.doc,H.pos))&&(e&&e(C.tr.split(H.pos).scrollIntoView()),!0)
if(!H.parent.isBlock)return!1
if(e){var V=i.parentOffset==i.parent.content.size,n=C.tr
C.selection instanceof dV.TextSelection&&n.deleteSelection()
var r=0==H.depth?null:H.node(-1).contentMatchAt(H.indexAfter(-1)).defaultType,L=V&&r?[{type:r}]:null,o=aV.canSplit(n.doc,H.pos,1,L)
L||o||!aV.canSplit(n.doc,n.mapping.map(H.pos),1,r&&[{type:r}])||(L=[{type:r}],o=!0),o&&(n.split(n.mapping.map(H.pos),1,L),V||H.parentOffset||H.parent.type==r||!H.node(-1).canReplace(H.index(-1),H.indexAfter(-1),oV.Fragment.from(r.create(),H.parent))||n.setNodeMarkup(n.mapping.map(H.before()),r)),e(n.scrollIntoView())}return!0}function c(C,e){return e&&e(C.tr.setSelection(new dV.AllSelection(C.doc))),!0}function u(C,e,t){var H,i,V=e.nodeBefore,n=e.nodeAfter
if(V.type.spec.isolating||n.type.spec.isolating)return!1
if(function(C,e,t){var H=e.nodeBefore,i=e.nodeAfter,V=e.index()
return!(!(H&&i&&H.type.compatibleContent(i.type))||(!H.content.size&&e.parent.canReplace(V-1,V)?(t&&t(C.tr.delete(e.pos-H.nodeSize,e.pos).scrollIntoView()),0):!e.parent.canReplace(V,V+1)||!i.isTextblock&&!aV.canJoin(C.doc,e.pos)||(t&&t(C.tr.clearIncompatible(e.pos,H.type,H.contentMatchAt(H.childCount)).join(e.pos).scrollIntoView()),0)))}(C,e,t))return!0
if(e.parent.canReplace(e.index(),e.index()+1)&&(H=(i=V.contentMatchAt(V.childCount)).findWrapping(n.type))&&i.matchType(H[0]||n.type).validEnd){if(t){for(var r=e.pos+n.nodeSize,L=oV.Fragment.empty,o=H.length-1;o>=0;o--)L=oV.Fragment.from(H[o].create(null,L))
L=oV.Fragment.from(V.copy(L))
var s=C.tr.step(new aV.ReplaceAroundStep(e.pos-1,r,e.pos,r,new oV.Slice(L,1,0),H.length,!0)),a=r+2*H.length
aV.canJoin(s.doc,a)&&s.join(a),t(s.scrollIntoView())}return!0}var M=dV.Selection.findFrom(e,1),l=M&&M.$from.blockRange(M.$to),d=l&&aV.liftTarget(l)
return null!=d&&d>=e.depth&&(t&&t(C.tr.lift(l,d).scrollIntoView()),!0)}function h(){for(var C=[],e=arguments.length;e--;)C[e]=arguments[e]
return function(e,t,H){for(var i=0;i<C.length;i++)if(C[i](e,t,H))return!0
return!1}}Object.defineProperty(e,"__esModule",{value:!0})
var p=h(t,H,V),m=h(t,r,L),f={Enter:h(s,M,l,d),"Mod-Enter":a,Backspace:p,"Mod-Backspace":p,Delete:m,"Mod-Delete":m,"Mod-a":c},g={"Ctrl-h":f.Backspace,"Alt-Backspace":f["Mod-Backspace"],"Ctrl-d":f.Delete,"Ctrl-Alt-Backspace":f["Mod-Delete"],"Alt-Delete":f["Mod-Delete"],"Alt-d":f["Mod-Delete"]}
for(var Z in f)g[Z]=f[Z]
var v=("undefined"!=typeof navigator?/Mac/.test(navigator.platform):"undefined"!=typeof os&&"darwin"==os.platform())?g:f
e.deleteSelection=t,e.joinBackward=H,e.selectNodeBackward=V,e.joinForward=r,e.selectNodeForward=L,e.joinUp=function(C,e){var t,H=C.selection,i=H instanceof dV.NodeSelection
if(i){if(H.node.isTextblock||!aV.canJoin(C.doc,H.from))return!1
t=H.from}else if(null==(t=aV.joinPoint(C.doc,H.from,-1)))return!1
if(e){var V=C.tr.join(t)
i&&V.setSelection(dV.NodeSelection.create(V.doc,t-C.doc.resolve(t).nodeBefore.nodeSize)),e(V.scrollIntoView())}return!0},e.joinDown=function(C,e){var t,H=C.selection
if(H instanceof dV.NodeSelection){if(H.node.isTextblock||!aV.canJoin(C.doc,H.to))return!1
t=H.to}else if(null==(t=aV.joinPoint(C.doc,H.to,1)))return!1
return e&&e(C.tr.join(t).scrollIntoView()),!0},e.lift=function(C,e){var t=C.selection,H=t.$from,i=t.$to,V=H.blockRange(i),n=V&&aV.liftTarget(V)
return null!=n&&(e&&e(C.tr.lift(V,n).scrollIntoView()),!0)},e.newlineInCode=s,e.exitCode=a,e.createParagraphNear=M,e.liftEmptyBlock=l,e.splitBlock=d,e.splitBlockKeepMarks=function(C,e){return d(C,e&&function(t){var H=C.storedMarks||C.selection.$to.parentOffset&&C.selection.$from.marks()
H&&t.ensureMarks(H),e(t)})},e.selectParentNode=function(C,e){var t,H=C.selection,i=H.$from,V=H.to,n=i.sharedDepth(V)
return 0!=n&&(t=i.before(n),e&&e(C.tr.setSelection(dV.NodeSelection.create(C.doc,t))),!0)},e.selectAll=c,e.wrapIn=function(C,e){return function(t,H){var i=t.selection,V=i.$from,n=i.$to,r=V.blockRange(n),L=r&&aV.findWrapping(r,C,e)
return!!L&&(H&&H(t.tr.wrap(r,L).scrollIntoView()),!0)}},e.setBlockType=function(C,e){return function(t,H){var i=t.selection,V=i.from,n=i.to,r=!1
return t.doc.nodesBetween(V,n,function(H,i){if(r)return!1
if(H.isTextblock&&!H.hasMarkup(C,e))if(H.type==C)r=!0
else{var V=t.doc.resolve(i),n=V.index()
r=V.parent.canReplaceWith(n,n+1,C)}}),!!r&&(H&&H(t.tr.setBlockType(V,n,C,e).scrollIntoView()),!0)}},e.toggleMark=function(C,e){return function(t,H){var i=t.selection,V=i.empty,n=i.$cursor,r=i.ranges
if(V&&!n||!function(C,e,t){for(var H=function(H){var i=e[H],V=i.$from,n=i.$to,r=0==V.depth&&C.type.allowsMarkType(t)
if(C.nodesBetween(V.pos,n.pos,function(C){if(r)return!1
r=C.inlineContent&&C.type.allowsMarkType(t)}),r)return{v:!0}},i=0;i<e.length;i++){var V=H(i)
if(V)return V.v}return!1}(t.doc,r,C))return!1
if(H)if(n)C.isInSet(t.storedMarks||n.marks())?H(t.tr.removeStoredMark(C)):H(t.tr.addStoredMark(C.create(e)))
else{for(var L=!1,o=t.tr,s=0;!L&&s<r.length;s++){var a=r[s],M=a.$from,l=a.$to
L=t.doc.rangeHasMark(M.pos,l.pos,C)}for(var d=0;d<r.length;d++){var c=r[d],u=c.$from,h=c.$to
L?o.removeMark(u.pos,h.pos,C):o.addMark(u.pos,h.pos,C.create(e))}H(o.scrollIntoView())}return!0}},e.autoJoin=function(C,e){if(Array.isArray(e)){var t=e
e=function(C){return t.indexOf(C.type.name)>-1}}return function(t,H){return C(t,H&&function(C,e){return function(t){if(!t.isGeneric)return C(t)
for(var H=[],i=0;i<t.mapping.maps.length;i++){for(var V=t.mapping.maps[i],n=0;n<H.length;n++)H[n]=V.map(H[n])
V.forEach(function(C,e,t,i){return H.push(t,i)})}for(var r=[],L=0;L<H.length;L+=2)for(var o=H[L],s=H[L+1],a=t.doc.resolve(o),M=a.sharedDepth(s),l=a.node(M),d=a.indexAfter(M),c=a.after(M+1);c<=s;++d){var u=l.maybeChild(d)
if(!u)break
if(d&&-1==r.indexOf(c)){var h=l.child(d-1)
h.type==u.type&&e(h,u)&&r.push(c)}c+=u.nodeSize}r.sort(function(C,e){return C-e})
for(var p=r.length-1;p>=0;p--)aV.canJoin(t.doc,r[p])&&t.join(r[p])
C(t)}}(H,e))}},e.chainCommands=h,e.pcBaseKeymap=f,e.macBaseKeymap=g,e.baseKeymap=v}))
VV(uV)
uV.deleteSelection,uV.joinBackward,uV.selectNodeBackward,uV.joinForward,uV.selectNodeForward,uV.joinUp,uV.joinDown,uV.lift,uV.newlineInCode,uV.exitCode,uV.createParagraphNear,uV.liftEmptyBlock,uV.splitBlock,uV.splitBlockKeepMarks,uV.selectParentNode,uV.selectAll,uV.wrapIn
var hV=uV.setBlockType,pV=uV.toggleMark,mV=(uV.autoJoin,uV.chainCommands,uV.pcBaseKeymap,uV.macBaseKeymap,uV.baseKeymap),fV=function(){}
fV.prototype.append=function(C){return C.length?(C=fV.from(C),!this.length&&C||C.length<200&&this.leafAppend(C)||this.length<200&&C.leafPrepend(this)||this.appendInner(C)):this},fV.prototype.prepend=function(C){return C.length?fV.from(C).append(this):this},fV.prototype.appendInner=function(C){return new ZV(this,C)},fV.prototype.slice=function(C,e){return void 0===C&&(C=0),void 0===e&&(e=this.length),C>=e?fV.empty:this.sliceInner(Math.max(0,C),Math.min(this.length,e))},fV.prototype.get=function(C){if(!(C<0||C>=this.length))return this.getInner(C)},fV.prototype.forEach=function(C,e,t){void 0===e&&(e=0),void 0===t&&(t=this.length),e<=t?this.forEachInner(C,e,t,0):this.forEachInvertedInner(C,e,t,0)},fV.prototype.map=function(C,e,t){void 0===e&&(e=0),void 0===t&&(t=this.length)
var H=[]
return this.forEach(function(e,t){return H.push(C(e,t))},e,t),H},fV.from=function(C){return C instanceof fV?C:C&&C.length?new gV(C):fV.empty}
var gV=function(C){function e(e){C.call(this),this.values=e}C&&(e.__proto__=C),e.prototype=Object.create(C&&C.prototype),e.prototype.constructor=e
var t={length:{},depth:{}}
return e.prototype.flatten=function(){return this.values},e.prototype.sliceInner=function(C,t){return 0==C&&t==this.length?this:new e(this.values.slice(C,t))},e.prototype.getInner=function(C){return this.values[C]},e.prototype.forEachInner=function(C,e,t,H){for(var i=e;i<t;i++)if(!1===C(this.values[i],H+i))return!1},e.prototype.forEachInvertedInner=function(C,e,t,H){for(var i=e-1;i>=t;i--)if(!1===C(this.values[i],H+i))return!1},e.prototype.leafAppend=function(C){if(this.length+C.length<=200)return new e(this.values.concat(C.flatten()))},e.prototype.leafPrepend=function(C){if(this.length+C.length<=200)return new e(C.flatten().concat(this.values))},t.length.get=function(){return this.values.length},t.depth.get=function(){return 0},Object.defineProperties(e.prototype,t),e}(fV)
fV.empty=new gV([])
var ZV=function(C){function e(e,t){C.call(this),this.left=e,this.right=t,this.length=e.length+t.length,this.depth=Math.max(e.depth,t.depth)+1}return C&&(e.__proto__=C),e.prototype=Object.create(C&&C.prototype),e.prototype.constructor=e,e.prototype.flatten=function(){return this.left.flatten().concat(this.right.flatten())},e.prototype.getInner=function(C){return C<this.left.length?this.left.get(C):this.right.get(C-this.left.length)},e.prototype.forEachInner=function(C,e,t,H){var i=this.left.length
return!(e<i&&!1===this.left.forEachInner(C,e,Math.min(t,i),H))&&(!(t>i&&!1===this.right.forEachInner(C,Math.max(e-i,0),Math.min(this.length,t)-i,H+i))&&void 0)},e.prototype.forEachInvertedInner=function(C,e,t,H){var i=this.left.length
return!(e>i&&!1===this.right.forEachInvertedInner(C,e-i,Math.max(t,i)-i,H+i))&&(!(t<i&&!1===this.left.forEachInvertedInner(C,Math.min(e,i),t,H))&&void 0)},e.prototype.sliceInner=function(C,e){if(0==C&&e==this.length)return this
var t=this.left.length
return e<=t?this.left.slice(C,e):C>=t?this.right.slice(C-t,e-t):this.left.slice(C,t).append(this.right.slice(0,e-t))},e.prototype.leafAppend=function(C){var t=this.right.leafAppend(C)
if(t)return new e(this.left,t)},e.prototype.leafPrepend=function(C){var t=this.left.leafPrepend(C)
if(t)return new e(t,this.right)},e.prototype.appendInner=function(C){return this.left.depth>=Math.max(this.right.depth,C.depth)+1?new e(this.left,new e(this.right,C)):new e(this,C)},e}(fV),vV=fV,yV=nV(function(C,e){Object.defineProperty(e,"__esModule",{value:!0})
var t,H=(t=vV)&&"object"==typeof t&&"default"in t?t.default:t,i=function(C,e){this.items=C,this.eventCount=e}
i.prototype.popEvent=function(C,e){var t=this
if(0==this.eventCount)return null
for(var H,n,r=this.items.length;;r--){if(t.items.get(r-1).selection){--r
break}}e&&(H=this.remapping(r,this.items.length),n=H.maps.length)
var L,o,s=C.tr,a=[],M=[]
return this.items.forEach(function(C,e){if(!C.step)return H||(H=t.remapping(r,e+1),n=H.maps.length),n--,void M.push(C)
if(H){M.push(new V(C.map))
var l,d=C.step.map(H.slice(n))
d&&s.maybeStep(d).doc&&(l=s.mapping.maps[s.mapping.maps.length-1],a.push(new V(l,null,null,a.length+M.length))),n--,l&&H.appendMap(l,n)}else s.maybeStep(C.step)
return C.selection?(L=H?C.selection.map(H.slice(n)):C.selection,o=new i(t.items.slice(0,r).append(M.reverse().concat(a)),t.eventCount-1),!1):void 0},this.items.length,0),{remaining:o,transform:s,selection:L}},i.prototype.addTransform=function(C,e,t,H){for(var n=[],L=this.eventCount,o=this.items,s=!H&&o.length?o.get(o.length-1):null,a=0;a<C.steps.length;a++){var M,l=C.steps[a].invert(C.docs[a]),d=new V(C.mapping.maps[a],l,e);(M=s&&s.merge(d))&&(d=M,a?n.pop():o=o.slice(0,o.length-1)),n.push(d),e&&(L++,e=null),H||(s=d)}var c,u,h,p=L-t.depth
return p>r&&(u=p,(c=o).forEach(function(C,e){if(C.selection&&0==u--)return h=e,!1}),o=c.slice(h),L-=p),new i(o.append(n),L)},i.prototype.remapping=function(C,e){var t=new aV.Mapping
return this.items.forEach(function(e,H){var i=null!=e.mirrorOffset&&H-e.mirrorOffset>=C?i=t.maps.length-e.mirrorOffset:null
t.appendMap(e.map,i)},C,e),t},i.prototype.addMaps=function(C){return 0==this.eventCount?this:new i(this.items.append(C.map(function(C){return new V(C)})),this.eventCount)},i.prototype.rebased=function(C,e){if(!this.eventCount)return this
var t=[],H=Math.max(0,this.items.length-e),n=C.mapping,r=C.steps.length,L=this.eventCount
this.items.forEach(function(C){C.selection&&L--},H)
var o=e
this.items.forEach(function(e){var H=n.getMirror(--o)
if(null!=H){r=Math.min(r,H)
var i=n.maps[H]
if(e.step){var s=C.steps[H].invert(C.docs[H]),a=e.selection&&e.selection.map(n.slice(o+1,H))
a&&L++,t.push(new V(i,s,a))}else t.push(new V(i))}},H)
for(var s=[],a=e;a<r;a++)s.push(new V(n.maps[a]))
var M=this.items.slice(0,H).append(s).append(t),l=new i(M,L)
return l.emptyItemCount()>500&&(l=l.compress(this.items.length-t.length)),l},i.prototype.emptyItemCount=function(){var C=0
return this.items.forEach(function(e){e.step||C++}),C},i.prototype.compress=function(C){void 0===C&&(C=this.items.length)
var e=this.remapping(0,C),t=e.maps.length,n=[],r=0
return this.items.forEach(function(H,i){if(i>=C)n.push(H),H.selection&&r++
else if(H.step){var L=H.step.map(e.slice(t)),o=L&&L.getMap()
if(t--,o&&e.appendMap(o,t),L){var s=H.selection&&H.selection.map(e.slice(t))
s&&r++
var a,M=new V(o.invert(),L,s),l=n.length-1;(a=n.length&&n[l].merge(M))?n[l]=a:n.push(M)}}else H.map&&t--},this.items.length,0),new i(H.from(n.reverse()),r)},i.empty=new i(H.empty,0)
var V=function(C,e,t,H){this.map=C,this.step=e,this.selection=t,this.mirrorOffset=H}
V.prototype.merge=function(C){if(this.step&&C.step&&!C.selection){var e=C.step.merge(this.step)
if(e)return new V(e.getMap().invert(),e,this.selection)}}
var n=function(C,e,t,H){this.done=C,this.undone=e,this.prevRanges=t,this.prevTime=H},r=20
function L(C){var e=[]
return C.forEach(function(C,t,H,i){return e.push(H,i)}),e}function o(C,e){if(!C)return null
for(var t=[],H=0;H<C.length;H+=2){var i=e.map(C[H],1),V=e.map(C[H+1],-1)
i<=V&&t.push(i,V)}return t}function s(C,e,t,H){var i=l(e),V=d.get(e).spec.config,r=(H?C.undone:C.done).popEvent(e,i)
if(r){var L=r.selection.resolve(r.transform.doc),o=(H?C.done:C.undone).addTransform(r.transform,e.selection.getBookmark(),V,i),s=new n(H?o:r.remaining,H?r.remaining:o,null,0)
t(r.transform.setSelection(L).setMeta(d,{redo:H,historyState:s}).scrollIntoView())}}var a=!1,M=null
function l(C){var e=C.plugins
if(M!=e){a=!1,M=e
for(var t=0;t<e.length;t++)if(e[t].spec.historyPreserveItems){a=!0
break}}return a}var d=new dV.PluginKey("history"),c=new dV.PluginKey("closeHistory")
e.HistoryState=n,e.closeHistory=function(C){return C.setMeta(c,!0)},e.history=function(C){return C={depth:C&&C.depth||100,newGroupDelay:C&&C.newGroupDelay||500},new dV.Plugin({key:d,state:{init:function(){return new n(i.empty,i.empty,null,0)},apply:function(e,t,H){return function(C,e,t,H){var V,r=t.getMeta(d)
if(r)return r.historyState
t.getMeta(c)&&(C=new n(C.done,C.undone,null,0))
var s=t.getMeta("appendedTransaction")
if(0==t.steps.length)return C
if(s&&s.getMeta(d))return s.getMeta(d).redo?new n(C.done.addTransform(t,null,H,l(e)),C.undone,L(t.mapping.maps[t.steps.length-1]),C.prevTime):new n(C.done,C.undone.addTransform(t,null,H,l(e)),null,C.prevTime)
if(!1===t.getMeta("addToHistory")||s&&!1===s.getMeta("addToHistory"))return(V=t.getMeta("rebased"))?new n(C.done.rebased(t,V),C.undone.rebased(t,V),o(C.prevRanges,t.mapping),C.prevTime):new n(C.done.addMaps(t.mapping.maps),C.undone.addMaps(t.mapping.maps),o(C.prevRanges,t.mapping),C.prevTime)
var a=C.prevTime<(t.time||0)-H.newGroupDelay||!s&&!function(C,e){if(!e)return!1
if(!C.docChanged)return!0
var t=!1
return C.mapping.maps[0].forEach(function(C,H){for(var i=0;i<e.length;i+=2)C<=e[i+1]&&H>=e[i]&&(t=!0)}),t}(t,C.prevRanges),M=s?o(C.prevRanges,t.mapping):L(t.mapping.maps[t.steps.length-1])
return new n(C.done.addTransform(t,a?e.selection.getBookmark():null,H,l(e)),i.empty,M,t.time)}(t,H,e,C)}},config:C})},e.undo=function(C,e){var t=d.getState(C)
return!(!t||0==t.done.eventCount||(e&&s(t,C,e,!1),0))},e.redo=function(C,e){var t=d.getState(C)
return!(!t||0==t.undone.eventCount||(e&&s(t,C,e,!0),0))},e.undoDepth=function(C){var e=d.getState(C)
return e?e.done.eventCount:0},e.redoDepth=function(C){var e=d.getState(C)
return e?e.undone.eventCount:0}})
VV(yV)
yV.HistoryState,yV.closeHistory
for(var bV=yV.history,kV=yV.undo,wV=yV.redo,SV=(yV.undoDepth,yV.redoDepth,{8:"Backspace",9:"Tab",10:"Enter",12:"NumLock",13:"Enter",16:"Shift",17:"Control",18:"Alt",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",44:"PrintScreen",45:"Insert",46:"Delete",59:";",61:"=",91:"Meta",92:"Meta",106:"*",107:"+",108:",",109:"-",110:".",111:"/",144:"NumLock",145:"ScrollLock",160:"Shift",161:"Shift",162:"Control",163:"Control",164:"Alt",165:"Alt",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",229:"q"}),OV={48:")",49:"!",50:"@",51:"#",52:"$",53:"%",54:"^",55:"&",56:"*",57:"(",59:";",61:"+",173:"_",186:":",187:"+",188:"<",189:"_",190:">",191:"?",192:"~",219:"{",220:"|",221:"}",222:'"',229:"Q"},xV="undefined"!=typeof navigator&&/Chrome\/(\d+)/.exec(navigator.userAgent),AV="undefined"!=typeof navigator&&/Apple Computer/.test(navigator.vendor),TV="undefined"!=typeof navigator&&/Gecko\/\d+/.test(navigator.userAgent),BV="undefined"!=typeof navigator&&/Mac/.test(navigator.platform),EV=xV&&(BV||+xV[1]<57)||TV&&BV,DV=0;DV<10;DV++)SV[48+DV]=SV[96+DV]=String(DV)
for(DV=1;DV<=24;DV++)SV[DV+111]="F"+DV
for(DV=65;DV<=90;DV++)SV[DV]=String.fromCharCode(DV+32),OV[DV]=String.fromCharCode(DV)
for(var NV in SV)OV.hasOwnProperty(NV)||(OV[NV]=SV[NV])
function PV(C){var e=!(EV&&(C.ctrlKey||C.altKey||C.metaKey)||AV&&C.shiftKey&&C.key&&1==C.key.length)&&C.key||(C.shiftKey?OV:SV)[C.keyCode]||C.key||"Unidentified"
return"Esc"==e&&(e="Escape"),"Del"==e&&(e="Delete"),"Left"==e&&(e="ArrowLeft"),"Up"==e&&(e="ArrowUp"),"Right"==e&&(e="ArrowRight"),"Down"==e&&(e="ArrowDown"),e}var RV=PV
PV.base=SV,PV.shift=OV
var FV=nV(function(C,e){Object.defineProperty(e,"__esModule",{value:!0})
var t,H=(t=RV)&&"object"==typeof t&&"default"in t?t.default:t,i="undefined"!=typeof navigator&&/Mac/.test(navigator.platform)
function V(C){var e,t,H,V,n=C.split(/-(?!$)/),r=n[n.length-1]
"Space"==r&&(r=" ")
for(var L=0;L<n.length-1;L++){var o=n[L]
if(/^(cmd|meta|m)$/i.test(o))V=!0
else if(/^a(lt)?$/i.test(o))e=!0
else if(/^(c|ctrl|control)$/i.test(o))t=!0
else if(/^s(hift)?$/i.test(o))H=!0
else{if(!/^mod$/i.test(o))throw new Error("Unrecognized modifier name: "+o)
i?V=!0:t=!0}}return e&&(r="Alt-"+r),t&&(r="Ctrl-"+r),V&&(r="Meta-"+r),H&&(r="Shift-"+r),r}function n(C,e,t){return e.altKey&&(C="Alt-"+C),e.ctrlKey&&(C="Ctrl-"+C),e.metaKey&&(C="Meta-"+C),!1!==t&&e.shiftKey&&(C="Shift-"+C),C}function r(C){var e=function(C){var e=Object.create(null)
for(var t in C)e[V(t)]=C[t]
return e}(C)
return function(C,t){var i,V=H(t),r=1==V.length&&" "!=V,L=e[n(V,t,!r)]
if(L&&L(C.state,C.dispatch,C))return!0
if(r&&(t.shiftKey||t.altKey||t.metaKey)&&(i=H.base[t.keyCode])&&i!=V){var o=e[n(i,t,!0)]
if(o&&o(C.state,C.dispatch,C))return!0}return!1}}e.keymap=function(C){return new dV.Plugin({props:{handleKeyDown:r(C)}})},e.keydownHandler=r})
VV(FV)
var IV=FV.keymap,_V=(FV.keydownHandler,nV(function(C,e){Object.defineProperty(e,"__esModule",{value:!0})
var t={}
if("undefined"!=typeof navigator&&"undefined"!=typeof document){var H=/Edge\/(\d+)/.exec(navigator.userAgent),i=/MSIE \d/.test(navigator.userAgent),V=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent)
t.mac=/Mac/.test(navigator.platform)
var n=t.ie=!!(i||V||H)
t.ie_version=i?document.documentMode||6:V?+V[1]:H?+H[1]:null,t.gecko=!n&&/gecko\/(\d+)/i.test(navigator.userAgent),t.gecko_version=t.gecko&&+(/Firefox\/(\d+)/.exec(navigator.userAgent)||[0,0])[1]
var r=!n&&/Chrome\/(\d+)/.exec(navigator.userAgent)
t.chrome=!!r,t.chrome_version=r&&+r[1],t.ios=!n&&/AppleWebKit/.test(navigator.userAgent)&&/Mobile\/\w+/.test(navigator.userAgent),t.android=/Android \d/.test(navigator.userAgent),t.webkit=!n&&"WebkitAppearance"in document.documentElement.style,t.safari=/Apple Computer/.test(navigator.vendor),t.webkit_version=t.webkit&&+(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent)||[0,0])[1]}var L=function(C){for(var e=0;;e++)if(!(C=C.previousSibling))return e},o=function(C){var e=C.parentNode
return e&&11==e.nodeType?e.host:e},s=function(C,e,t){var H=document.createRange()
return H.setEnd(C,null==t?C.nodeValue.length:t),H.setStart(C,e||0),H},a=function(C,e,t,H){return t&&(l(C,e,t,H,-1)||l(C,e,t,H,1))},M=/^(img|br|input|textarea|hr)$/i
function l(C,e,t,H,i){for(;;){if(C==t&&e==H)return!0
if(e==(i<0?0:d(C))||3==C.nodeType&&"\ufeff"==C.nodeValue){var V=C.parentNode
if(1!=V.nodeType||(n=void 0,(n=C.pmViewDesc)&&n.node&&n.node.isBlock)||M.test(C.nodeName)||"false"==C.contentEditable)return!1
e=L(C)+(i<0?0:1),C=V}else{if(1!=C.nodeType)return!1
C=C.childNodes[e+(i<0?-1:0)],e=i<0?d(C):0}}var n}function d(C){return 3==C.nodeType?C.nodeValue.length:C.childNodes.length}var c=function(C){var e=C.isCollapsed
return e&&t.chrome&&C.rangeCount&&!C.getRangeAt(0).collapsed&&(e=!1),e}
function u(C){return{left:0,right:C.innerWidth,top:0,bottom:C.innerHeight}}function h(C,e){return"number"==typeof C?C:C[e]}function p(C,e,t){for(var H=C.someProp("scrollThreshold")||0,i=C.someProp("scrollMargin")||5,V=C.dom.ownerDocument,n=V.defaultView,r=t||C.dom;r;r=o(r))if(1==r.nodeType){var L=r==V.body||1!=r.nodeType,s=L?u(n):r.getBoundingClientRect(),a=0,M=0
if(e.top<s.top+h(H,"top")?M=-(s.top-e.top+h(i,"top")):e.bottom>s.bottom-h(H,"bottom")&&(M=e.bottom-s.bottom+h(i,"bottom")),e.left<s.left+h(H,"left")?a=-(s.left-e.left+h(i,"left")):e.right>s.right-h(H,"right")&&(a=e.right-s.right+h(i,"right")),(a||M)&&(L?n.scrollBy(a,M):(M&&(r.scrollTop+=M),a&&(r.scrollLeft+=a))),L)break}}function m(C,e){for(var t,H,i=2e8,V=0,n=e.top,r=e.top,L=C.firstChild,o=0;L;L=L.nextSibling,o++){var a=void 0
if(1==L.nodeType)a=L.getClientRects()
else{if(3!=L.nodeType)continue
a=s(L).getClientRects()}for(var M=0;M<a.length;M++){var l=a[M]
if(l.top<=n&&l.bottom>=r){n=Math.max(l.bottom,n),r=Math.min(l.top,r)
var d=l.left>e.left?l.left-e.left:l.right<e.left?e.left-l.right:0
if(d<i){t=L,i=d,H=d&&3==t.nodeType?{left:l.right<e.left?l.right:l.left,top:e.top}:e,1==L.nodeType&&d&&(V=o+(e.left>=(l.left+l.right)/2?1:0))
continue}}!t&&(e.left>=l.right&&e.top>=l.top||e.left>=l.left&&e.top>=l.bottom)&&(V=o+1)}}return t&&3==t.nodeType?function(C,e){for(var t=C.nodeValue.length,H=document.createRange(),i=0;i<t;i++){H.setEnd(C,i+1),H.setStart(C,i)
var V=Z(H,1)
if(V.top!=V.bottom&&f(e,V))return{node:C,offset:i+(e.left>=(V.left+V.right)/2?1:0)}}return{node:C,offset:0}}(t,H):!t||i&&1==t.nodeType?{node:C,offset:V}:m(t,H)}function f(C,e){return C.left>=e.left-1&&C.left<=e.right+1&&C.top>=e.top-1&&C.top<=e.bottom+1}function g(C,e){var t,H,i=C.root
if(i.caretPositionFromPoint){var V,n=i.caretPositionFromPoint(e.left,e.top)
if(n)t=(V=n).offsetNode,H=V.offset}if(!t&&i.caretRangeFromPoint){var r,L=i.caretRangeFromPoint(e.left,e.top)
if(L)t=(r=L).startContainer,H=r.startOffset}var o,s=i.elementFromPoint(e.left,e.top+1)
if(!s||!C.dom.contains(1!=s.nodeType?s.parentNode:s)){var a=C.dom.getBoundingClientRect()
if(!f(e,a))return null
if(!(s=function C(e,t,H){var i=e.childNodes.length
if(i&&H.top<H.bottom)for(var V=Math.max(0,Math.floor(i*(t.top-H.top)/(H.bottom-H.top))-2),n=V;;){var r=e.childNodes[n]
if(1==r.nodeType)for(var L=r.getClientRects(),o=0;o<L.length;o++){var s=L[o]
if(f(t,s))return C(r,t,s)}if((n=(n+1)%i)==V)break}return e}(C.dom,e,a)))return null}s=function(C,e){var t=C.parentNode
return t&&/^li$/i.test(t.nodeName)&&e.left<C.getBoundingClientRect().left?t:C}(s,e),t&&(t==C.dom&&H==t.childNodes.length-1&&1==t.lastChild.nodeType&&e.top>t.lastChild.getBoundingClientRect().bottom?o=C.state.doc.content.size:0!=H&&1==t.nodeType&&"BR"==t.childNodes[H-1].nodeName||(o=function(C,e,t,H){for(var i=-1,V=e;V!=C.dom;){var n=C.docView.nearestDesc(V,!0)
if(!n)return null
if(n.node.isBlock&&n.parent){var r=n.dom.getBoundingClientRect()
if(r.left>H.left||r.top>H.top)i=n.posBefore
else{if(!(r.right<H.left||r.bottom<H.top))break
i=n.posAfter}}V=n.dom.parentNode}return i>-1?i:C.docView.posFromDOM(e,t)}(C,t,H,e))),null==o&&(o=function(C,e,t){var H=m(e,t),i=H.node,V=H.offset,n=-1
if(1==i.nodeType&&!i.firstChild){var r=i.getBoundingClientRect()
n=r.left!=r.right&&t.left>(r.left+r.right)/2?1:-1}return C.docView.posFromDOM(i,V,n)}(C,s,e))
var M=C.docView.nearestDesc(s,!0)
return{pos:o,inside:M?M.posAtStart-M.border:-1}}function Z(C,e){var t=C.getClientRects()
return t.length?t[e<0?0:t.length-1]:C.getBoundingClientRect()}function v(C,e){var H=C.docView.domFromPos(e),i=H.node,V=H.offset
if(3==i.nodeType&&(t.chrome||t.gecko)){var n=Z(s(i,V,V),0)
if(t.gecko&&V&&/\s/.test(i.nodeValue[V-1])&&V<i.nodeValue.length){var r=Z(s(i,V-1,V-1),-1)
if(Math.abs(r.left-n.left)<1&&r.top==n.top){var L=Z(s(i,V,V+1),-1)
return y(L,L.left<r.left)}}return n}for(var o=-1;o<2;o+=2)if(o<0&&V){var a=void 0,M=3==i.nodeType?s(i,V-1,V):3==(a=i.childNodes[V-1]).nodeType?s(a):1==a.nodeType&&"BR"!=a.nodeName?a:null
if(M){var l=Z(M,1)
if(l.top<l.bottom)return y(l,!1)}}else if(o>0&&V<d(i)){var c=void 0,u=3==i.nodeType?s(i,V,V+1):3==(c=i.childNodes[V]).nodeType?s(c):1==c.nodeType?c:null
if(u){var h=Z(u,-1)
if(h.top<h.bottom)return y(h,!0)}}return y(Z(3==i.nodeType?s(i):i,0),!1)}function y(C,e){if(0==C.width)return C
var t=e?C.left:C.right
return{top:C.top,bottom:C.bottom,left:t,right:t}}function b(C,e,t){var H=C.state,i=C.root.activeElement
H==e&&C.inDOMChange||C.updateState(e),i!=C.dom&&C.focus()
try{return t()}finally{H!=e&&C.updateState(H),i!=C.dom&&i.focus()}}var k=/[\u0590-\u08ac]/
var w=null,S=null,O=!1
function x(C,e,t){return w==e&&S==t?O:(w=e,S=t,O="up"==t||"down"==t?function(C,e,t){var H=e.selection,i="up"==t?H.$anchor.min(H.$head):H.$anchor.max(H.$head)
return b(C,e,function(){for(var e=C.docView.domFromPos(i.pos).node;;){var H=C.docView.nearestDesc(e,!0)
if(!H)break
if(H.node.isBlock){e=H.dom
break}e=H.dom.parentNode}for(var V=v(C,i.pos),n=e.firstChild;n;n=n.nextSibling){var r=void 0
if(1==n.nodeType)r=n.getClientRects()
else{if(3!=n.nodeType)continue
r=s(n,0,n.nodeValue.length).getClientRects()}for(var L=0;L<r.length;L++){var o=r[L]
if(o.bottom>o.top&&("up"==t?o.bottom<V.top+1:o.top>V.bottom-1))return!1}}return!0})}(C,e,t):function(C,e,t){var H=e.selection.$head
if(!H.parent.isTextblock)return!1
var i=H.parentOffset,V=!i,n=i==H.parent.content.size,r=getSelection()
return k.test(H.parent.textContent)&&r.modify?b(C,e,function(){var e=r.getRangeAt(0),i=r.focusNode,V=r.focusOffset
r.modify("move",t,"character")
var n=!(H.depth?C.docView.domAfterPos(H.before()):C.dom).contains(1==r.focusNode.nodeType?r.focusNode:r.focusNode.parentNode)||i==r.focusNode&&V==r.focusOffset
return r.removeAllRanges(),r.addRange(e),n}):"left"==t||"backward"==t?V:n}(C,e,t))}var A=function(C,e,t,H){this.parent=C,this.children=e,this.dom=t,t.pmViewDesc=this,this.contentDOM=H,this.dirty=0},T={beforePosition:{},size:{},border:{},posBefore:{},posAtStart:{},posAfter:{},posAtEnd:{},contentLost:{}}
A.prototype.matchesWidget=function(){return!1},A.prototype.matchesMark=function(){return!1},A.prototype.matchesNode=function(){return!1},A.prototype.matchesHack=function(){return!1},T.beforePosition.get=function(){return!1},A.prototype.parseRule=function(){return null},A.prototype.stopEvent=function(){return!1},T.size.get=function(){for(var C=0,e=0;e<this.children.length;e++)C+=this.children[e].size
return C},T.border.get=function(){return 0},A.prototype.destroy=function(){this.parent=null,this.dom.pmViewDesc==this&&(this.dom.pmViewDesc=null)
for(var C=0;C<this.children.length;C++)this.children[C].destroy()},A.prototype.posBeforeChild=function(C){for(var e=0,t=this.posAtStart;e<this.children.length;e++){var H=this.children[e]
if(H==C)return t
t+=H.size}},T.posBefore.get=function(){return this.parent.posBeforeChild(this)},T.posAtStart.get=function(){return this.parent?this.parent.posBeforeChild(this)+this.border:0},T.posAfter.get=function(){return this.posBefore+this.size},T.posAtEnd.get=function(){return this.posAtStart+this.size-2*this.border},A.prototype.localPosFromDOM=function(C,e,t){var H
if(this.contentDOM&&this.contentDOM.contains(1==C.nodeType?C:C.parentNode)){if(t<0){var i,V
if(C==this.contentDOM)i=C.childNodes[e-1]
else{for(;C.parentNode!=this.contentDOM;)C=C.parentNode
i=C.previousSibling}for(;i&&(!(V=i.pmViewDesc)||V.parent!=this);)i=i.previousSibling
return i?this.posBeforeChild(V)+V.size:this.posAtStart}var n,r
if(C==this.contentDOM)n=C.childNodes[e]
else{for(;C.parentNode!=this.contentDOM;)C=C.parentNode
n=C.nextSibling}for(;n&&(!(r=n.pmViewDesc)||r.parent!=this);)n=n.nextSibling
return n?this.posBeforeChild(r):this.posAtEnd}if(this.contentDOM&&this.contentDOM!=this.dom&&this.dom.contains(this.contentDOM))H=2&C.compareDocumentPosition(this.contentDOM)
else if(this.dom.firstChild){if(0==e)for(var L=C;;L=L.parentNode){if(L==this.dom){H=!1
break}if(L.parentNode.firstChild!=L)break}if(null==H&&e==C.childNodes.length)for(var o=C;;o=o.parentNode){if(o==this.dom){H=!0
break}if(o.parentNode.lastChild!=o)break}}return(null==H?t>0:H)?this.posAtEnd:this.posAtStart},A.prototype.nearestDesc=function(C,e){for(var t=!0,H=C;H;H=H.parentNode){var i=this.getDesc(H)
if(i&&(!e||i.node)){if(!t||!i.nodeDOM||(1==i.nodeDOM.nodeType?i.nodeDOM.contains(C):i.nodeDOM==C))return i
t=!1}}},A.prototype.getDesc=function(C){for(var e=C.pmViewDesc,t=e;t;t=t.parent)if(t==this)return e},A.prototype.posFromDOM=function(C,e,t){for(var H=C;;H=H.parentNode){var i=this.getDesc(H)
if(i)return i.localPosFromDOM(C,e,t)}},A.prototype.descAt=function(C){for(var e=0,t=0;e<this.children.length;e++){var H=this.children[e],i=t+H.size
if(t==C&&i!=t){for(;!H.border&&H.children.length;)H=H.children[0]
return H}if(C<i)return H.descAt(C-t-H.border)
t=i}},A.prototype.domFromPos=function(C){if(!this.contentDOM)return{node:this.dom,offset:0}
for(var e=0,t=0;;t++){if(e==C){for(;t<this.children.length&&this.children[t].beforePosition;)t++
return{node:this.contentDOM,offset:t}}if(t==this.children.length)throw new Error("Invalid position "+C)
var H=this.children[t],i=e+H.size
if(C<i)return H.domFromPos(C-e-H.border)
e=i}},A.prototype.parseRange=function(C,e,t){if(void 0===t&&(t=0),0==this.children.length)return{node:this.contentDOM,from:C,to:e,fromOffset:0,toOffset:this.contentDOM.childNodes.length}
for(var H=-1,i=-1,V=0,n=0;;n++){var r=this.children[n],o=V+r.size
if(-1==H&&C<=o){var s=V+r.border
if(C>=s&&e<=o-r.border&&r.node&&r.contentDOM&&this.contentDOM.contains(r.contentDOM))return r.parseRange(C-s,e-s,t+s)
C=t+V
for(var a=n;a>0;a--){var M=this.children[a-1]
if(M.size&&M.dom.parentNode==this.contentDOM&&!M.emptyChildAt(1)){H=L(M.dom)+1
break}C-=M.size}-1==H&&(H=0)}if(H>-1&&e<=o){e=t+o
for(var l=n+1;l<this.children.length;l++){var d=this.children[l]
if(d.size&&d.dom.parentNode==this.contentDOM&&!d.emptyChildAt(-1)){i=L(d.dom)
break}e+=d.size}-1==i&&(i=this.contentDOM.childNodes.length)
break}V=o}return{node:this.contentDOM,from:C,to:e,fromOffset:H,toOffset:i}},A.prototype.emptyChildAt=function(C){if(this.border||!this.contentDOM||!this.children.length)return!1
var e=this.children[C<0?0:this.children.length-1]
return 0==e.size||e.emptyChildAt(C)},A.prototype.domAfterPos=function(C){var e=this.domFromPos(C),t=e.node,H=e.offset
if(1!=t.nodeType||H==t.childNodes.length)throw new RangeError("No node after pos "+C)
return t.childNodes[H]},A.prototype.setSelection=function(C,e,t,H){for(var i=Math.min(C,e),V=Math.max(C,e),n=0,r=0;n<this.children.length;n++){var L=this.children[n],o=r+L.size
if(i>r&&V<o)return L.setSelection(C-r-L.border,e-r-L.border,t,H)
r=o}var s=this.domFromPos(C),M=this.domFromPos(e),l=t.getSelection(),d=document.createRange()
if(H||!a(s.node,s.offset,l.anchorNode,l.anchorOffset)||!a(M.node,M.offset,l.focusNode,l.focusOffset)){if(l.extend)d.setEnd(s.node,s.offset),d.collapse(!1)
else{if(C>e){var c=s
s=M,M=c}d.setEnd(M.node,M.offset),d.setStart(s.node,s.offset)}l.removeAllRanges(),l.addRange(d),l.extend&&l.extend(M.node,M.offset)}},A.prototype.ignoreMutation=function(C){return!this.contentDOM},T.contentLost.get=function(){return this.contentDOM&&this.contentDOM!=this.dom&&!this.dom.contains(this.contentDOM)},A.prototype.markDirty=function(C,e){for(var t=0,H=0;H<this.children.length;H++){var i=this.children[H],V=t+i.size
if(t==V?C<=V&&e>=t:C<V&&e>t){var n=t+i.border,r=V-i.border
if(C>=n&&e<=r)return this.dirty=C==t||e==V?2:1,void(C==n&&e==r&&i.contentLost?i.dirty=3:i.markDirty(C-n,e-n))
i.dirty=3}t=V}this.dirty=2},Object.defineProperties(A.prototype,T)
var B=[],E=function(C){function e(e,t,H,i){var V,n=t.type.toDOM
if("function"==typeof n&&(n=n(H,function(){return V?V.parent?V.parent.posBeforeChild(V):void 0:i})),!t.type.spec.raw){if(1!=n.nodeType){var r=document.createElement("span")
r.appendChild(n),n=r}n.contentEditable=!1,n.classList.add("ProseMirror-widget")}C.call(this,e,B,n,null),this.widget=t,V=this}C&&(e.__proto__=C),e.prototype=Object.create(C&&C.prototype),e.prototype.constructor=e
var t={beforePosition:{}}
return t.beforePosition.get=function(){return this.widget.type.side<0},e.prototype.matchesWidget=function(C){return 0==this.dirty&&C.type.eq(this.widget.type)},e.prototype.parseRule=function(){return{ignore:!0}},e.prototype.stopEvent=function(C){var e=this.widget.spec.stopEvent
return!!e&&e(C)},Object.defineProperties(e.prototype,t),e}(A),D=function(C){function e(){C.apply(this,arguments)}return C&&(e.__proto__=C),e.prototype=Object.create(C&&C.prototype),e.prototype.constructor=e,e.prototype.parseRule=function(){for(var e,t=this.dom.firstChild;t;t=t.nextSibling){var H=void 0
if(3==t.nodeType){var i=t.nodeValue.replace(/\ufeff/g,"")
if(!i)continue
H=document.createTextNode(i)}else{if("\ufeff"==t.textContent)continue
H=t.cloneNode(!0)}e||(e=document.createDocumentFragment()),e.appendChild(H)}return e?{skip:e}:C.prototype.parseRule.call(this)},e.prototype.ignoreMutation=function(){return!1},e}(E),N=function(C){function e(e,t,H,i){C.call(this,e,[],H,i),this.mark=t}return C&&(e.__proto__=C),e.prototype=Object.create(C&&C.prototype),e.prototype.constructor=e,e.create=function(C,t,H,i){var V=i.nodeViews[t.type.name],n=V&&V(t,i,H)
return n&&n.dom||(n=oV.DOMSerializer.renderSpec(document,t.type.spec.toDOM(t,H))),new e(C,t,n.dom,n.contentDOM||n.dom)},e.prototype.parseRule=function(){return{mark:this.mark.type.name,attrs:this.mark.attrs,contentElement:this.contentDOM}},e.prototype.matchesMark=function(C){return 3!=this.dirty&&this.mark.eq(C)},e.prototype.markDirty=function(e,t){if(C.prototype.markDirty.call(this,e,t),0!=this.dirty){for(var H=this.parent;!H.node;)H=H.parent
H.dirty<this.dirty&&(H.dirty=this.dirty),this.dirty=0}},e}(A),P=function(C){function e(e,t,H,i,V,n,r,L,o){C.call(this,e,t.isLeaf?B:[],V,n),this.nodeDOM=r,this.node=t,this.outerDeco=H,this.innerDeco=i,n&&this.updateChildren(L,o)}C&&(e.__proto__=C),e.prototype=Object.create(C&&C.prototype),e.prototype.constructor=e
var H={size:{},border:{}}
return e.create=function(C,t,H,i,V,n){var r,L=V.nodeViews[t.type.name],o=L&&L(t,V,function(){return r?r.parent?r.parent.posBeforeChild(r):void 0:n},H),s=o&&o.dom,a=o&&o.contentDOM
if(t.isText)if(s){if(3!=s.nodeType)throw new RangeError("Text must be rendered as a DOM text node")}else s=document.createTextNode(t.text)
else if(!s){var M
s=(M=oV.DOMSerializer.renderSpec(document,t.type.spec.toDOM(t))).dom,a=M.contentDOM}a||t.isText||"BR"==s.nodeName||(s.hasAttribute("contenteditable")||(s.contentEditable=!1),t.type.spec.draggable&&(s.draggable=!0))
var l=s
return s=$(s,H,t),o?r=new _(C,t,H,i,s,a,l,o,V,n+1):t.isText?new F(C,t,H,i,s,l,V):new e(C,t,H,i,s,a,l,V,n+1)},e.prototype.parseRule=function(){var C=this
if(this.node.type.spec.reparseInView)return null
var e={node:this.node.type.name,attrs:this.node.attrs}
return this.node.type.spec.code&&(e.preserveWhitespace="full"),this.contentDOM&&!this.contentLost?e.contentElement=this.contentDOM:e.getContent=function(){return C.contentDOM?oV.Fragment.empty:C.node.content},e},e.prototype.matchesNode=function(C,e,t){return 0==this.dirty&&C.eq(this.node)&&q(e,this.outerDeco)&&t.eq(this.innerDeco)},H.size.get=function(){return this.node.nodeSize},H.border.get=function(){return this.node.isLeaf?0:1},e.prototype.updateChildren=function(C,e){var t=this,H=new J(this),i=this.node.inlineContent;(function(C,e,t,H){var i=e.locals(C),V=0
if(0==i.length){for(var n=0;n<C.childCount;n++){var r=C.child(n)
H(r,i,e.forChild(V,r),n),V+=r.nodeSize}return}for(var L=0,o=[],s=null,a=0;;){if(L<i.length&&i[L].to==V){for(var M=i[L++],l=void 0;L<i.length&&i[L].to==V;)(l||(l=[M])).push(i[L++])
if(l){l.sort(Y)
for(var d=0;d<l.length;d++)t(l[d],a)}else t(M,a)}var c=void 0
if(s)c=s,s=null
else{if(!(a<C.childCount))break
c=C.child(a++)}for(var u=0;u<o.length;u++)o[u].to<=V&&o.splice(u--,1)
for(;L<i.length&&i[L].from==V;)o.push(i[L++])
var h=V+c.nodeSize
if(c.isText){var p=h
L<i.length&&i[L].from<p&&(p=i[L].from)
for(var m=0;m<o.length;m++)o[m].to<p&&(p=o[m].to)
p<h&&(s=c.cut(p-V),c=c.cut(0,p-V),h=p)}H(c,o.length?o.slice():B,e.forChild(V,c),a-1),V=h}})(this.node,this.innerDeco,function(V,n){V.spec.marks?H.syncToMarks(V.spec.marks,i,C):V.type.side>=0&&H.syncToMarks(n==t.node.childCount?oV.Mark.none:t.node.child(n).marks,i,C),H.placeWidget(V,C,e)},function(t,V,n,r){H.syncToMarks(t.marks,i,C),H.findNodeMatch(t,V,n,r)||H.updateNextNode(t,V,n,C,r)||H.addNode(t,V,n,C,e),e+=t.nodeSize}),H.syncToMarks(B,i,C),this.node.isTextblock&&H.addTextblockHacks(),H.destroyRest(),(H.changed||2==this.dirty)&&this.renderChildren()},e.prototype.renderChildren=function(){(function C(e,t){var H=e.firstChild
for(var i=0;i<t.length;i++){var V=t[i],n=V.dom
if(n.parentNode==e){for(;n!=H;)H=K(H)
H=H.nextSibling}else e.insertBefore(n,H)
if(V instanceof N){var r=H?H.previousSibling:e.lastChild
C(V.contentDOM,V.children),H=r?r.nextSibling:e.firstChild}}for(;H;)H=K(H)})(this.contentDOM,this.children,e.is),t.ios&&function(C){if("UL"==C.nodeName||"OL"==C.nodeName){var e=C.style.cssText
C.style.cssText=e+"; list-style: square !important",window.getComputedStyle(C).listStyle,C.style.cssText=e}}(this.dom)},e.prototype.update=function(C,e,t,H){return!(3==this.dirty||!C.sameMarkup(this.node))&&(this.updateInner(C,e,t,H),!0)},e.prototype.updateInner=function(C,e,t,H){this.updateOuterDeco(e),this.node=C,this.innerDeco=t,this.contentDOM&&this.updateChildren(H,this.posAtStart),this.dirty=0},e.prototype.updateOuterDeco=function(C){if(!q(C,this.outerDeco)){var e=1!=this.nodeDOM.nodeType,t=this.dom
this.dom=U(this.dom,this.nodeDOM,j(this.outerDeco,this.node,e),j(C,this.node,e)),this.dom!=t&&(t.pmViewDesc=null,this.dom.pmViewDesc=this),this.outerDeco=C}},e.prototype.selectNode=function(){this.nodeDOM.classList.add("ProseMirror-selectednode"),!this.contentDOM&&this.node.type.spec.draggable||(this.dom.draggable=!0)},e.prototype.deselectNode=function(){this.nodeDOM.classList.remove("ProseMirror-selectednode"),!this.contentDOM&&this.node.type.spec.draggable||(this.dom.draggable=!1)},Object.defineProperties(e.prototype,H),e}(A)
function R(C,e,t,H,i){return $(H,e,C),new P(null,C,e,t,H,H,H,i,0)}var F=function(C){function e(e,t,H,i,V,n,r){C.call(this,e,t,H,i,V,null,n,r)}return C&&(e.__proto__=C),e.prototype=Object.create(C&&C.prototype),e.prototype.constructor=e,e.prototype.parseRule=function(){var C=this.nodeDOM.parentNode
return C?{skip:C}:{ignore:!0}},e.prototype.update=function(C,e){return!(3==this.dirty||0!=this.dirty&&!this.inParent()||!C.sameMarkup(this.node))&&(this.updateOuterDeco(e),0==this.dirty&&C.text==this.node.text||C.text==this.nodeDOM.nodeValue||(this.nodeDOM.nodeValue=C.text),this.node=C,this.dirty=0,!0)},e.prototype.inParent=function(){for(var C=this.parent.contentDOM,e=this.nodeDOM;e;e=e.parentNode)if(e==C)return!0
return!1},e.prototype.domFromPos=function(C){return{node:this.nodeDOM,offset:C}},e.prototype.localPosFromDOM=function(e,t,H){return e==this.nodeDOM?this.posAtStart+Math.min(t,this.node.text.length):C.prototype.localPosFromDOM.call(this,e,t,H)},e.prototype.ignoreMutation=function(C){return"characterData"!=C.type},e}(P),I=function(C){function e(){C.apply(this,arguments)}return C&&(e.__proto__=C),e.prototype=Object.create(C&&C.prototype),e.prototype.constructor=e,e.prototype.parseRule=function(){return{ignore:!0}},e.prototype.matchesHack=function(){return 0==this.dirty},e}(A),_=function(C){function e(e,t,H,i,V,n,r,L,o,s){C.call(this,e,t,H,i,V,n,r,o,s),this.spec=L}return C&&(e.__proto__=C),e.prototype=Object.create(C&&C.prototype),e.prototype.constructor=e,e.prototype.update=function(e,t,H,i){if(3==this.dirty)return!1
if(this.spec.update){var V=this.spec.update(e,t)
return V&&this.updateInner(e,t,H,i),V}return!(!this.contentDOM&&!e.isLeaf)&&C.prototype.update.call(this,e,t,H,i)},e.prototype.selectNode=function(){this.spec.selectNode?this.spec.selectNode():C.prototype.selectNode.call(this)},e.prototype.deselectNode=function(){this.spec.deselectNode?this.spec.deselectNode():C.prototype.deselectNode.call(this)},e.prototype.setSelection=function(e,t,H,i){this.spec.setSelection?this.spec.setSelection(e,t,H):C.prototype.setSelection.call(this,e,t,H,i)},e.prototype.destroy=function(){this.spec.destroy&&this.spec.destroy(),C.prototype.destroy.call(this)},e.prototype.stopEvent=function(C){return!!this.spec.stopEvent&&this.spec.stopEvent(C)},e.prototype.ignoreMutation=function(e){return this.spec.ignoreMutation?this.spec.ignoreMutation(e):C.prototype.ignoreMutation.call(this,e)},e}(P)
function z(C){C&&(this.nodeName=C)}z.prototype=Object.create(null)
var W=[new z]
function j(C,e,t){if(0==C.length)return W
for(var H=t?W[0]:new z,i=[H],V=0;V<C.length;V++){var n=C[V].type.attrs,r=H
if(n)for(var L in n.nodeName&&i.push(r=new z(n.nodeName)),n){var o=n[L]
null!=o&&(t&&1==i.length&&i.push(r=H=new z(e.isInline?"span":"div")),"class"==L?r.class=(r.class?r.class+" ":"")+o:"style"==L?r.style=(r.style?r.style+";":"")+o:"nodeName"!=L&&(r[L]=o))}}return i}function U(C,e,t,H){if(t==W&&H==W)return e
for(var i=e,V=0;V<H.length;V++){var n=H[V],r=t[V]
if(V){var L=void 0
r&&r.nodeName==n.nodeName&&i!=C&&(L=e.parentNode)&&L.tagName.toLowerCase()==n.nodeName?i=L:((L=document.createElement(n.nodeName)).appendChild(i),i=L)}G(i,r||W[0],n)}return i}function G(C,e,t){for(var H in e)"class"==H||"style"==H||"nodeName"==H||H in t||C.removeAttribute(H)
for(var i in t)"class"!=i&&"style"!=i&&"nodeName"!=i&&t[i]!=e[i]&&C.setAttribute(i,t[i])
if(e.class!=t.class){for(var V=e.class?e.class.split(" "):B,n=t.class?t.class.split(" "):B,r=0;r<V.length;r++)-1==n.indexOf(V[r])&&C.classList.remove(V[r])
for(var L=0;L<n.length;L++)-1==V.indexOf(n[L])&&C.classList.add(n[L])}if(e.style!=t.style){if(e.style)for(var o,s=/\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g;o=s.exec(e.style);)C.style[o[1].toLowerCase()]=""
t.style&&(C.style.cssText+=t.style)}}function $(C,e,t){return U(C,C,W,j(e,t,1!=C.nodeType))}function q(C,e){if(C.length!=e.length)return!1
for(var t=0;t<C.length;t++)if(!C[t].type.eq(e[t].type))return!1
return!0}function K(C){var e=C.nextSibling
return C.parentNode.removeChild(C),e}var J=function(C){this.top=C,this.index=0,this.stack=[],this.changed=!1,this.preMatched=function(C,e){for(var t=[],H=C.childCount,i=e.length-1;H>0&&i>=0;i--){var V=e[i],n=V.node
if(n){if(n!=C.child(H-1))break
t[--H]=V}}return t}(C.node.content,C.children)}
function Y(C,e){return C.type.side-e.type.side}function X(C,e){var t=C.selection,H=t.$anchor,i=t.$head,V=e>0?H.max(i):H.min(i),n=V.parent.inlineContent?V.depth?C.doc.resolve(e>0?V.after():V.before()):null:V
return n&&dV.Selection.findFrom(n,e)}function Q(C,e){return C.dispatch(C.state.tr.setSelection(e).scrollIntoView()),!0}function CC(C,e,t){var H=C.state.selection
if(H instanceof dV.TextSelection){if(!H.empty||t.indexOf("s")>-1)return!1
if(C.endOfTextblock(e>0?"right":"left")){var i=X(C.state,e)
return!!(i&&i instanceof dV.NodeSelection)&&Q(C,i)}var V,n=H.$head,r=n.textOffset?null:e<0?n.nodeBefore:n.nodeAfter
if(r&&dV.NodeSelection.isSelectable(r)){var L=e<0?n.pos-r.nodeSize:n.pos
if(r.isAtom||(V=C.docView.descAt(L))&&!V.contentDOM)return Q(C,new dV.NodeSelection(e<0?C.state.doc.resolve(n.pos-r.nodeSize):n))}return!1}if(H instanceof dV.NodeSelection&&H.node.isInline)return Q(C,new dV.TextSelection(e>0?H.$to:H.$from))
var o=X(C.state,e)
return!!o&&Q(C,o)}function eC(C){return 3==C.nodeType?C.nodeValue.length:C.childNodes.length}function tC(C){var e=C.pmViewDesc
return e&&0==e.size&&(C.nextSibling||"BR"!=C.nodeName)}function HC(C){var e=C.root.getSelection(),H=e.focusNode,i=e.focusOffset
if(H){var V,n,r=!1
for(t.gecko&&1==H.nodeType&&i<eC(H)&&tC(H.childNodes[i])&&(r=!0);;)if(i>0)if(1!=H.nodeType){if(3!=H.nodeType||"\ufeff"!=H.nodeValue.charAt(i-1))break
t.ie&&t.ie_version<=11&&(r=!0),V=H,n=--i}else{var o=H.childNodes[i-1]
if(tC(o))V=H,n=--i
else{if(3!=o.nodeType)break
i=(H=o).nodeValue.length}}else{if(VC(H))break
for(var s=H.previousSibling;s&&tC(s);)V=H.parentNode,n=L(s),s=s.previousSibling
if(s)i=eC(H=s)
else{if((H=H.parentNode)==C.dom)break
i=0}}r?nC(C,e,H,i):V&&nC(C,e,V,n)}}function iC(C){var e=C.root.getSelection(),t=e.focusNode,H=e.focusOffset
if(t){for(var i,V,n=eC(t);;)if(H<n){if(1!=t.nodeType)break
if(!tC(t.childNodes[H]))break
i=t,V=++H}else{if(VC(t))break
for(var r=t.nextSibling;r&&tC(r);)i=r.parentNode,V=L(r)+1,r=r.nextSibling
if(r)H=0,n=eC(t=r)
else{if((t=t.parentNode)==C.dom)break
H=n=0}}i&&nC(C,e,i,V)}}function VC(C){var e=C.pmViewDesc
return e&&e.node&&e.node.isBlock}function nC(C,e,t,H){if(c(e)){var i=document.createRange()
i.setEnd(t,H),i.setStart(t,H),e.removeAllRanges(),e.addRange(i)}else e.extend&&e.extend(t,H)
C.selectionReader.storeDOMState(C.selection)}function rC(C,e,t){var H=C.state.selection
if(H instanceof dV.TextSelection&&!H.empty||t.indexOf("s")>-1)return!1
var i=H.$from,V=H.$to
if(!i.parent.inlineContent||C.endOfTextblock(e<0?"up":"down")){var n=X(C.state,e)
if(n&&n instanceof dV.NodeSelection)return Q(C,n)}if(!i.parent.inlineContent){var r=dV.Selection.findFrom(e<0?i:V,e)
return!r||Q(C,r)}return!1}function LC(C,e){if(!(C.state.selection instanceof dV.TextSelection))return!0
var t=C.state.selection,H=t.$head,i=t.$anchor,V=t.empty
if(!H.sameParent(i))return!0
if(!V)return!1
if(C.endOfTextblock(e>0?"forward":"backward"))return!0
var n=!H.textOffset&&(e<0?H.nodeBefore:H.nodeAfter)
if(n&&!n.isText){var r=C.state.tr
return e<0?r.delete(H.pos-n.nodeSize,H.pos):r.delete(H.pos,H.pos+n.nodeSize),C.dispatch(r),!0}return!1}function oC(C,e,t){C.domObserver.stop(),e.contentEditable=t,C.domObserver.start()}function sC(C,e){var H=e.keyCode,i=function(C){var e=""
return C.ctrlKey&&(e+="c"),C.metaKey&&(e+="m"),C.altKey&&(e+="a"),C.shiftKey&&(e+="s"),e}(e)
return 8==H||t.mac&&72==H&&"c"==i?LC(C,-1)||HC(C):46==H||t.mac&&68==H&&"c"==i?LC(C,1)||iC(C):13==H||27==H||(37==H?CC(C,-1,i)||HC(C):39==H?CC(C,1,i)||iC(C):38==H?rC(C,-1,i)||HC(C):40==H?function(C){if(t.chrome&&!(C.state.selection.$head.parentOffset>0)){var e=C.root.getSelection(),H=e.focusNode,i=e.focusOffset
if(H&&1==H.nodeType&&0==i&&H.firstChild&&"false"==H.firstChild.contentEditable){var V=H.firstChild
oC(C,V,!0),setTimeout(function(){return oC(C,V,!1)},20)}}}(C)||rC(C,1,i)||iC(C):i==(t.mac?"m":"c")&&(66==H||73==H||89==H||90==H))}J.prototype.destroyBetween=function(C,e){if(C!=e){for(var t=C;t<e;t++)this.top.children[t].destroy()
this.top.children.splice(C,e-C),this.changed=!0}},J.prototype.destroyRest=function(){this.destroyBetween(this.index,this.top.children.length)},J.prototype.syncToMarks=function(C,e,t){for(var H=0,i=this.stack.length>>1,V=Math.min(i,C.length);H<V&&(H==i-1?this.top:this.stack[H+1<<1]).matchesMark(C[H])&&!1!==C[H].type.spec.spanning;)H++
for(;H<i;)this.destroyRest(),this.top.dirty=0,this.index=this.stack.pop(),this.top=this.stack.pop(),i--
for(;i<C.length;){this.stack.push(this.top,this.index+1)
for(var n=-1,r=this.index;r<Math.min(this.index+3,this.top.children.length);r++)if(this.top.children[r].matchesMark(C[i])){n=r
break}if(n>-1)n>this.index&&(this.changed=!0,this.top.children.splice(this.index,n-this.index)),this.top=this.top.children[this.index]
else{var L=N.create(this.top,C[i],e,t)
this.top.children.splice(this.index,0,L),this.top=L,this.changed=!0}this.index=0,i++}},J.prototype.findNodeMatch=function(C,e,t,H){var i=-1,V=this.preMatched[H],n=this.top.children
if(V&&V.matchesNode(C,e,t))i=n.indexOf(V)
else for(var r=this.index,L=Math.min(n.length,r+5);r<L;r++){var o=n[r]
if(o.matchesNode(C,e,t)&&this.preMatched.indexOf(o)<0){i=r
break}}return!(i<0)&&(this.destroyBetween(this.index,i),this.index++,!0)},J.prototype.updateNextNode=function(C,e,t,H,i){if(this.index==this.top.children.length)return!1
var V=this.top.children[this.index]
if(V instanceof P){var n=this.preMatched.indexOf(V)
if(n>-1&&n!=i)return!1
var r=V.dom
if(V.update(C,e,t,H))return V.dom!=r&&(this.changed=!0),this.index++,!0}return!1},J.prototype.addNode=function(C,e,t,H,i){this.top.children.splice(this.index++,0,P.create(this.top,C,e,t,H,i)),this.changed=!0},J.prototype.placeWidget=function(C,e,t){if(this.index<this.top.children.length&&this.top.children[this.index].matchesWidget(C))this.index++
else{var H=new(C.spec.isCursorWrapper?D:E)(this.top,C,e,t)
this.top.children.splice(this.index++,0,H),this.changed=!0}},J.prototype.addTextblockHacks=function(){for(var C=this.top.children[this.index-1];C instanceof N;)C=C.children[C.children.length-1]
if(!C||!(C instanceof F)||/\n$/.test(C.node.text))if(this.index<this.top.children.length&&this.top.children[this.index].matchesHack())this.index++
else{var e=document.createElement("br")
this.top.children.splice(this.index++,0,new I(this.top,B,e,null)),this.changed=!0}}
var aC=function(C,e,t){this.prev=C,this.mapping=e,this.state=t},MC=function(C){this.seen=[new aC(null,null,C)],dV.EditorState.addApplyListener(this.track=this.track.bind(this))}
MC.prototype.destroy=function(){dV.EditorState.removeApplyListener(this.track)},MC.prototype.find=function(C){for(var e=this.seen.length-1;e>=0;e--){var t=this.seen[e]
if(t.state==C)return t}},MC.prototype.track=function(C,e,t){var H=this.seen.length<200?this.find(C):null
H&&this.seen.push(new aC(H,e.docChanged?e.mapping:null,t))},MC.prototype.getMapping=function(C,e){var t=this.find(C)
if(!t)return null
for(var H=[],i=t;i;i=i.prev)i.mapping&&H.push(i.mapping)
for(var V=e||new aV.Mapping,n=H.length-1;n>=0;n--)V.appendMapping(H[n])
return V}
var lC=function(C){var e=this
this.view=C,this.lastAnchorNode=this.lastHeadNode=this.lastAnchorOffset=this.lastHeadOffset=null,this.lastSelection=C.state.selection,this.ignoreUpdates=!1,this.suppressUpdates=!1,this.poller=new("onselectionchange"in document?dC:cC)(this),this.focusFunc=function(){return e.poller.start(ZC(e.view))}.bind(this),this.blurFunc=this.poller.stop,C.dom.addEventListener("focus",this.focusFunc),C.dom.addEventListener("blur",this.blurFunc),C.editable||this.poller.start(!1)}
lC.prototype.destroy=function(){this.view.dom.removeEventListener("focus",this.focusFunc),this.view.dom.removeEventListener("blur",this.blurFunc),this.poller.stop()},lC.prototype.poll=function(C){this.poller.poll(C)},lC.prototype.editableChanged=function(){this.view.editable?ZC(this.view)||this.poller.stop():this.poller.start()},lC.prototype.domChanged=function(){var C=this.view.root.getSelection()
return C.anchorNode!=this.lastAnchorNode||C.anchorOffset!=this.lastAnchorOffset||C.focusNode!=this.lastHeadNode||C.focusOffset!=this.lastHeadOffset},lC.prototype.storeDOMState=function(C){var e=this.view.root.getSelection()
this.lastAnchorNode=e.anchorNode,this.lastAnchorOffset=e.anchorOffset,this.lastHeadNode=e.focusNode,this.lastHeadOffset=e.focusOffset,this.lastSelection=C},lC.prototype.clearDOMState=function(){this.lastAnchorNode=this.lastSelection=null},lC.prototype.readFromDOM=function(C){if(!this.ignoreUpdates&&this.domChanged()&&ZC(this.view)){if(this.suppressUpdates)return uC(this.view)
if(this.view.inDOMChange||this.view.domObserver.flush(),!this.view.inDOMChange){var e,t,H=this.view.root.getSelection(),i=this.view.state.doc,V=this.view.docView.nearestDesc(H.focusNode),n=V&&0==V.size,r=this.view.docView.posFromDOM(H.focusNode,H.focusOffset),L=i.resolve(r)
if(c(H)){for(e=L;V&&!V.node;)V=V.parent
if(V&&V.node.isAtom&&dV.NodeSelection.isSelectable(V.node)&&V.parent){var o=V.posBefore
t=new dV.NodeSelection(r==o?L:i.resolve(o))}}else e=i.resolve(this.view.docView.posFromDOM(H.anchorNode,H.anchorOffset))
if(!t){var s="pointer"==C||this.view.state.selection.head<L.pos&&!n?1:-1
t=gC(this.view,e,L,s)}if(this.view.state.selection.eq(t))uC(this.view)
else{var a=this.view.state.tr.setSelection(t)
"pointer"==C?a.setMeta("pointer",!0):"key"==C&&a.scrollIntoView(),this.view.dispatch(a)}}}}
var dC=function(C){var e=this
this.listening=!1,this.curOrigin=null,this.originTime=0,this.reader=C,this.readFunc=function(){return C.readFromDOM(e.originTime>Date.now()-50?e.curOrigin:null)}}
dC.prototype.poll=function(C){this.curOrigin=C,this.originTime=Date.now()},dC.prototype.start=function(C){this.listening||(this.reader.view.dom.ownerDocument.addEventListener("selectionchange",this.readFunc),this.listening=!0,C&&this.readFunc())},dC.prototype.stop=function(){this.listening&&(this.reader.view.dom.ownerDocument.removeEventListener("selectionchange",this.readFunc),this.listening=!1)}
var cC=function(C){this.polling=null,this.reader=C,this.pollFunc=this.doPoll.bind(this,null)}
function uC(C,e,H){var i=C.state.selection
if(mC(C,i),C.editable&&!C.hasFocus()){if(!e)return
t.gecko&&t.gecko_version<=55&&(C.selectionReader.ignoreUpdates=!0,C.dom.focus(),C.selectionReader.ignoreUpdates=!1)}else if(!C.editable&&!vC(C)&&!e)return
var V=C.selectionReader
if(!V.lastSelection||!V.lastSelection.eq(i)||V.domChanged()){if(V.ignoreUpdates=!0,C.cursorWrapper)(function(C){var e=C.root.getSelection(),H=document.createRange(),i=C.cursorWrapper.dom
H.setEnd(i,i.childNodes.length),H.collapse(!1),e.removeAllRanges(),e.addRange(H),!C.state.selection.visible&&t.ie&&t.ie_version<=11&&(i.disabled=!0,i.disabled=!1)})(C)
else{var n,r,L=i.anchor,o=i.head
!hC||i instanceof dV.TextSelection||(i.$from.parent.inlineContent||(n=pC(C,i.from)),i.empty||i.$from.parent.inlineContent||(r=pC(C,i.to))),C.docView.setSelection(L,o,C.root,H),hC&&(n&&(n.contentEditable="false"),r&&(r.contentEditable="false")),i.visible?C.dom.classList.remove("ProseMirror-hideselection"):L!=o&&(C.dom.classList.add("ProseMirror-hideselection"),"onselectionchange"in document&&function(C){var e=C.dom.ownerDocument
e.removeEventListener("selectionchange",C.hideSelectionGuard)
var t=C.root.getSelection(),H=t.anchorNode,i=t.anchorOffset
e.addEventListener("selectionchange",C.hideSelectionGuard=function(){t.anchorNode==H&&t.anchorOffset==i||(e.removeEventListener("selectionchange",C.hideSelectionGuard),C.dom.classList.remove("ProseMirror-hideselection"))})}(C))}V.storeDOMState(i),V.ignoreUpdates=!1}}cC.prototype.doPoll=function(C){var e=this.reader.view
e.focused||!e.editable?(this.reader.readFromDOM(C),this.polling=setTimeout(this.pollFunc,100)):this.polling=null},cC.prototype.poll=function(C){clearTimeout(this.polling),this.polling=setTimeout(C?this.doPoll.bind(this,C):this.pollFunc,0)},cC.prototype.start=function(){null==this.polling&&this.poll()},cC.prototype.stop=function(){clearTimeout(this.polling),this.polling=null}
var hC=t.safari||t.chrome&&t.chrome_version<63
function pC(C,e){var t=C.docView.domFromPos(e),H=t.node,i=t.offset,V=i<H.childNodes.length?H.childNodes[i]:null,n=i?H.childNodes[i-1]:null
if(!(V&&"false"!=V.contentEditable||n&&"false"!=n.contentEditable)){if(V)return V.contentEditable="true",V
if(n)return n.contentEditable="true",n}}function mC(C,e){if(e instanceof dV.NodeSelection){var t=C.docView.descAt(e.from)
t!=C.lastSelectedViewDesc&&(fC(C),t&&t.selectNode(),C.lastSelectedViewDesc=t)}else fC(C)}function fC(C){C.lastSelectedViewDesc&&(C.lastSelectedViewDesc.deselectNode(),C.lastSelectedViewDesc=null)}function gC(C,e,t,H){return C.someProp("createSelectionBetween",function(H){return H(C,e,t)})||dV.TextSelection.between(e,t,H)}function ZC(C){return(!C.editable||C.root.activeElement==C.dom)&&vC(C)}function vC(C){var e=C.root.getSelection()
if(!e.anchorNode)return!1
try{return C.dom.contains(3==e.anchorNode.nodeType?e.anchorNode.parentNode:e.anchorNode)&&(C.editable||C.dom.contains(3==e.focusNode.nodeType?e.focusNode.parentNode:e.focusNode))}catch(t){return!1}}function yC(C){return!1===C.type.spec.inclusive}function bC(C){var e=C.selection,t=e.$head,H=e.$anchor,i=e.visible,V=t.pos!=H.pos||i&&!t.parent.inlineContent?null:t
return V&&(!i||C.storedMarks||0==V.parent.content.length||V.parentOffset&&!V.textOffset&&V.nodeBefore.marks.some(yC))?V:null}var kC=function C(e,t){var H=this
this.view=e,this.state=e.state,this.composing=t,this.compositionEndedAt=null,this.from=this.to=null,this.typeOver=!1,this.timeout=t?null:setTimeout(function(){return H.finish()},C.commitTimeout),this.trackMappings=new MC(e.state),this.mapping=new aV.Mapping,this.mappingTo=e.state}
function wC(C,e){return function(H){var i=H.pmViewDesc
if(i)return i.parseRule()
if("BR"==H.nodeName&&H.parentNode){if(t.safari&&/^(ul|ol)$/i.test(H.parentNode.nodeName))return C.matchTag(document.createElement("li"),e)
if(H.parentNode.lastChild==H||t.safari&&/^(tr|table)$/i.test(H.parentNode.nodeName))return{ignore:!0}}}}function SC(C,e){for(var t=e||0;t<C.depth;t++)if(C.index(t)+1<C.node(t).childCount)return!1
return C.parentOffset==C.parent.content.size}function OC(C,e){for(var t=e||0;t<C.depth;t++)if(C.index(0)>0)return!1
return 0==C.parentOffset}function xC(C,e){var t=document.createEvent("Event")
return t.initEvent("keydown",!0,!0),t.keyCode=C,t.key=t.code=e,t}function AC(C,e,t,H){return Math.max(H.anchor,H.head)>e.content.size?null:gC(C,e.resolve(t.map(H.anchor)),e.resolve(t.map(H.head)))}function TC(C,e,t){for(var H=C.depth,i=e?C.end():C.pos;H>0&&(e||C.indexAfter(H)==C.node(H).childCount);)H--,i++,e=!1
if(t)for(var V=C.node(H).maybeChild(C.indexAfter(H));V&&!V.isLeaf;)V=V.firstChild,i++
return i}function BC(C,e){for(var t=[],H=e.content,i=e.openStart,V=e.openEnd;i>1&&V>1&&1==H.childCount&&1==H.firstChild.childCount;){i--,V--
var n=H.firstChild
t.push(n.type.name,n.type.hasRequiredAttrs()?n.attrs:null),H=n.content}var r=C.someProp("clipboardSerializer")||oV.DOMSerializer.fromSchema(C.state.schema),L=document.createElement("div")
L.appendChild(r.serializeFragment(H))
for(var o,s=L.firstChild;s&&1==s.nodeType&&(o=NC[s.nodeName.toLowerCase()]);){for(var a=o.length-1;a>=0;a--){for(var M=document.createElement(o[a]);L.firstChild;)M.appendChild(L.firstChild)
L.appendChild(M)}s=L.firstChild}return s&&1==s.nodeType&&s.setAttribute("data-pm-slice",i+" "+V+" "+JSON.stringify(t)),{dom:L,text:C.someProp("clipboardTextSerializer",function(C){return C(e)})||e.content.textBetween(0,e.content.size,"\n\n")}}function EC(C,e,t,H,i){var V,n,r=i.parent.type.spec.code
if(!t&&!e)return null
var L=e&&(H||r||!t)
if(L){if(C.someProp("transformPastedText",function(C){e=C(e)}),r)return new oV.Slice(oV.Fragment.from(C.state.schema.text(e)),0,0)
var o=C.someProp("clipboardTextParser",function(C){return C(e,i)})
o?n=o:(V=document.createElement("div"),e.trim().split(/(?:\r\n?|\n)+/).forEach(function(C){V.appendChild(document.createElement("p")).textContent=C}))}else C.someProp("transformPastedHTML",function(C){return t=C(t)}),V=function(C){var e=/(\s*<meta [^>]*>)*/.exec(C)
e&&(C=C.slice(e[0].length))
var t,H=(PC||(PC=document.implementation.createHTMLDocument("title"))).createElement("div"),i=/(?:<meta [^>]*>)*<([a-z][^>\s]+)/i.exec(C),V=0;(t=i&&NC[i[1].toLowerCase()])&&(C=t.map(function(C){return"<"+C+">"}).join("")+C+t.map(function(C){return"</"+C+">"}).reverse().join(""),V=t.length)
H.innerHTML=C
for(var n=0;n<V;n++)H=H.firstChild
return H}(t)
var s=V&&V.querySelector("[data-pm-slice]"),a=s&&/^(\d+) (\d+) (.*)/.exec(s.getAttribute("data-pm-slice"))
if(!n){var M=C.someProp("clipboardParser")||C.someProp("domParser")||oV.DOMParser.fromSchema(C.state.schema)
n=M.parseSlice(V,{preserveWhitespace:!(!L&&!a),context:i})}return n=a?function(C,e){if(!C.size)return C
var t,H=C.content.firstChild.type.schema
try{t=JSON.parse(e)}catch(o){return C}for(var i=C.content,V=C.openStart,n=C.openEnd,r=t.length-2;r>=0;r-=2){var L=H.nodes[t[r]]
if(!L||L.hasRequiredAttrs())break
i=oV.Fragment.from(L.create(t[r+1],i)),V++,n++}return new oV.Slice(i,V,n)}(new oV.Slice(n.content,Math.min(n.openStart,+a[1]),Math.min(n.openEnd,+a[2])),a[3]):oV.Slice.maxOpen(function(C,e){if(C.childCount<2)return C
for(var t=function(t){var H=e.node(t),i=H.contentMatchAt(e.index(t)),V=void 0,n=[]
if(C.forEach(function(C){if(n){var e,t=i.findWrapping(C.type)
if(!t)return n=null
if(e=n.length&&V.length&&function C(e,t,H,i,V){if(V<e.length&&V<t.length&&e[V]==t[V]){var n=C(e,t,H,i.lastChild,V+1)
if(n)return i.copy(i.content.replaceChild(i.childCount-1,n))
var r=i.contentMatchAt(i.childCount)
if(r.matchType(V==e.length-1?H.type:e[V+1]))return i.copy(i.content.append(oV.Fragment.from(DC(H,e,V+1))))}}(t,V,C,n[n.length-1],0))n[n.length-1]=e
else{n.length&&(n[n.length-1]=function C(e,t){if(0==t)return e
var H=e.content.replaceChild(e.childCount-1,C(e.lastChild,t-1))
var i=e.contentMatchAt(e.childCount).fillBefore(oV.Fragment.empty,!0)
return e.copy(H.append(i))}(n[n.length-1],V.length))
var H=DC(C,t)
n.push(H),i=i.matchType(H.type,H.attrs),V=t}}}),n)return{v:oV.Fragment.from(n)}},H=e.depth;H>=0;H--){var i=t(H)
if(i)return i.v}return C}(n.content,i),!1),C.someProp("transformPasted",function(C){n=C(n)}),n}function DC(C,e,t){void 0===t&&(t=0)
for(var H=e.length-1;H>=t;H--)C=e[H].create(null,oV.Fragment.from(C))
return C}kC.prototype.addRange=function(C,e){null==this.from?(this.from=C,this.to=e):(this.from=Math.min(C,this.from),this.to=Math.max(e,this.to))},kC.prototype.changedRange=function(){if(null==this.from)return function(C){var e=C.$anchor.min(C.$head),t=C.$anchor.max(C.$head)
if(e.sameParent(t)&&e.parent.inlineContent&&e.parentOffset&&t.parentOffset<t.parent.content.size){var H=Math.max(0,e.parentOffset),i=e.parent.content.size,V=Math.min(i,t.parentOffset)
if(H>0&&(H=e.parent.childBefore(H).offset),V<i){var n=e.parent.childAfter(V)
V=n.offset+n.node.nodeSize}var r=e.start()
return{from:r+H,to:r+V}}for(var L=0;;L++){var o=OC(e,L+1),s=SC(t,L+1)
if(o||s||e.index(L)!=t.index(L)||t.node(L).isTextblock){var a=e.before(L+1),M=t.after(L+1)
return o&&e.index(L)>0&&(a-=e.node(L).child(e.index(L)-1).nodeSize),s&&t.index(L)+1<t.node(L).childCount&&(M+=t.node(L).child(t.index(L)+1).nodeSize),{from:a,to:M}}}}(this.state.selection)
var C=this.state.doc.resolve(Math.min(this.from,this.state.selection.from)),e=this.state.doc.resolve(this.to),t=C.sharedDepth(this.to)
return{from:C.before(t+1),to:e.after(t+1)}},kC.prototype.markDirty=function(C){null==this.from?this.view.docView.markDirty((C=C||this.changedRange()).from,C.to):this.view.docView.markDirty(this.from,this.to)},kC.prototype.stateUpdated=function(C){return this.trackMappings.getMapping(C,this.mapping)?(this.trackMappings.destroy(),this.trackMappings=new MC(C),this.mappingTo=C,!0):(this.markDirty(),this.destroy(),!1)},kC.prototype.finish=function(C){if(clearTimeout(this.timeout),!this.composing||C){this.view.domObserver.flush()
var e=this.changedRange()
this.markDirty(e),this.destroy()
var H=this.state.selection,i=this.typeOver&&H instanceof dV.TextSelection&&!H.empty&&H.$head.sameParent(H.$anchor);(function(C,e,H,i,V){var n,r,L=function(C,e,H){var i=C.docView.parseRange(H.from,H.to),V=i.node,n=i.fromOffset,r=i.toOffset,L=i.from,o=i.to,s=C.root.getSelection(),a=null,M=s.anchorNode
M&&C.dom.contains(1==M.nodeType?M:M.parentNode)&&(a=[{node:M,offset:s.anchorOffset}],c(s)||a.push({node:s.focusNode,offset:s.focusOffset}))
if(t.chrome&&8===C.lastKeyCode)for(var l=r;l>n;l--){var d=V.childNodes[l-1],u=d.pmViewDesc
if("BR"==d.nodeType&&!u){r=l
break}if(!u||u.size)break}var h=e.doc,p=C.someProp("domParser")||oV.DOMParser.fromSchema(C.state.schema),m=h.resolve(L),f=null,g=p.parse(V,{topNode:m.parent,topMatch:m.parent.contentMatchAt(m.index()),topOpen:!0,from:n,to:r,preserveWhitespace:!m.parent.type.spec.code||"full",editableContent:!0,findPositions:a,ruleFromNode:wC(p,m),context:m})
if(a&&null!=a[0].pos){var Z=a[0].pos,v=a[1]&&a[1].pos
null==v&&(v=Z),f={anchor:Z+L,head:v+L}}return{doc:g,sel:f,from:L,to:o}}(C,H,i),o=H.doc,s=o.slice(L.from,L.to)
8===C.lastKeyCode&&Date.now()-100<C.lastKeyCodeTime?(n=H.selection.to,r="end"):(n=H.selection.from,r="start")
C.lastKeyCode=null
var a=function(C,e,t,H,i){var V=C.findDiffStart(e,t)
if(null==V)return null
var n=C.findDiffEnd(e,t+C.size,t+e.size),r=n.a,L=n.b
if("end"==i){var o=Math.max(0,V-Math.min(r,L))
H-=r+o-V}if(r<V&&C.size<e.size){var s=H<=V&&H>=r?V-H:0
L=(V-=s)+(L-r),r=V}else if(L<V){var a=H<=V&&H>=L?V-H:0
r=(V-=a)+(r-L),L=V}return{start:V,endA:r,endB:L}}(s.content,L.doc.content,L.from,n,r)
if(!a){if(V){var M=C.state,l=M.selection
C.dispatch(M.tr.replaceSelectionWith(M.schema.text(M.doc.textBetween(l.from,l.to)),!0).scrollIntoView())}else if(L.sel){var d=AC(C,C.state.doc,e,L.sel)
d&&!d.eq(C.state.selection)&&C.dispatch(C.state.tr.setSelection(d))}return}H.selection.from<H.selection.to&&a.start==a.endB&&H.selection instanceof dV.TextSelection&&(a.start>H.selection.from&&a.start<=H.selection.from+2?a.start=H.selection.from:a.endA<H.selection.to&&a.endA>=H.selection.to-2&&(a.endB+=H.selection.to-a.endA,a.endA=H.selection.to))
var u,h=L.doc.resolveNoCache(a.start-L.from),p=L.doc.resolveNoCache(a.endB-L.from)
if(!h.sameParent(p)&&h.pos<L.doc.content.size&&(u=dV.Selection.findFrom(L.doc.resolve(h.pos+1),1,!0))&&u.head==p.pos&&C.someProp("handleKeyDown",function(e){return e(C,xC(13,"Enter"))}))return
if(H.selection.anchor>a.start&&function(C,e,t,H,i){if(!H.parent.isTextblock||t-e<=i.pos-H.pos||TC(H,!0,!1)<i.pos)return!1
var V=C.resolve(e)
if(V.parentOffset<V.parent.content.size||!V.parent.isTextblock)return!1
var n=C.resolve(TC(V,!0,!0))
if(!n.parent.isTextblock||n.pos>t||TC(n,!0,!1)<t)return!1
return H.parent.content.cut(H.parentOffset).eq(n.parent.content)}(o,a.start,a.endA,h,p)&&C.someProp("handleKeyDown",function(e){return e(C,xC(8,"Backspace"))}))return void(t.android&&t.chrome&&(C.selectionReader.suppressUpdates=!0,setTimeout(function(){return C.selectionReader.suppressUpdates=!1},50)))
var m,f,g,Z,v=e.map(a.start),y=e.map(a.endA,-1)
if(h.sameParent(p)&&h.parent.inlineContent)if(h.pos==p.pos)m=C.state.tr.delete(v,y),f=o.resolve(a.start).marksAcross(o.resolve(a.endA))
else if(a.endA==a.endB&&(Z=o.resolve(a.start))&&(g=function(C,e){for(var t,H,i,V=C.firstChild.marks,n=e.firstChild.marks,r=V,L=n,o=0;o<n.length;o++)r=n[o].removeFromSet(r)
for(var s=0;s<V.length;s++)L=V[s].removeFromSet(L)
if(1==r.length&&0==L.length)H=r[0],t="add",i=function(C){return C.mark(H.addToSet(C.marks))}
else{if(0!=r.length||1!=L.length)return null
H=L[0],t="remove",i=function(C){return C.mark(H.removeFromSet(C.marks))}}for(var a=[],M=0;M<e.childCount;M++)a.push(i(e.child(M)))
if(oV.Fragment.from(a).eq(C))return{mark:H,type:t}}(h.parent.content.cut(h.parentOffset,p.parentOffset),Z.parent.content.cut(Z.parentOffset,a.endA-Z.start()))))m=C.state.tr,"add"==g.type?m.addMark(v,y,g.mark):m.removeMark(v,y,g.mark)
else if(h.parent.child(h.index()).isText&&h.index()==p.index()-(p.textOffset?0:1)){var b=h.parent.textBetween(h.parentOffset,p.parentOffset)
if(C.someProp("handleTextInput",function(e){return e(C,v,y,b)}))return
m=C.state.tr.insertText(b,v,y)}m||(m=C.state.tr.replace(v,y,L.doc.slice(a.start-L.from,a.endB-L.from)))
if(L.sel){var k=AC(C,m.doc,e,L.sel)
k&&m.setSelection(k)}f&&m.ensureMarks(f)
C.dispatch(m.scrollIntoView())})(this.view,this.mapping,this.state,e,i),this.view.docView.dirty&&this.view.updateState(this.view.state)}},kC.prototype.destroy=function(){clearTimeout(this.timeout),this.trackMappings.destroy(),this.view.inDOMChange=null},kC.prototype.compositionEnd=function(C){var e=this
this.composing&&(this.composing=!1,C&&(this.compositionEndedAt=C.timeStamp),this.timeout=setTimeout(function(){return e.finish()},50))},kC.prototype.ignoreKeyDownOnCompositionEnd=function(C){return!!(t.safari&&null!==this.compositionEndedAt&&Math.abs(C.timeStamp-this.compositionEndedAt)<500)&&(this.compositionEndedAt=null,!0)},kC.start=function(C,e){return C.inDOMChange?e&&(clearTimeout(C.inDOMChange.timeout),C.inDOMChange.composing=!0,C.inDOMChange.compositionEndedAt=null):C.inDOMChange=new kC(C,e),C.inDOMChange},kC.commitTimeout=20
var NC={thead:["table"],colgroup:["table"],col:["table","colgroup"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","tbody","tr"]},PC=null
var RC={childList:!0,characterData:!0,attributes:!0,subtree:!0,characterDataOldValue:!0},FC=t.ie&&t.ie_version<=11,IC=function(C){var e=this
this.view=C,this.observer=window.MutationObserver&&new window.MutationObserver(function(C){return e.registerMutations(C)}),FC&&(this.onCharData=function(C){return e.registerMutation({target:C.target,type:"characterData",oldValue:C.prevValue})})}
IC.prototype.start=function(){this.observer&&this.observer.observe(this.view.dom,RC),FC&&this.view.dom.addEventListener("DOMCharacterDataModified",this.onCharData)},IC.prototype.stop=function(){this.observer&&(this.flush(),this.observer.disconnect()),FC&&this.view.dom.removeEventListener("DOMCharacterDataModified",this.onCharData)},IC.prototype.flush=function(){this.observer&&this.registerMutations(this.observer.takeRecords())},IC.prototype.registerMutations=function(C){for(var e=0;e<C.length;e++)this.registerMutation(C[e])},IC.prototype.registerMutation=function(C){if(this.view.editable){var e=this.view.docView.nearestDesc(C.target)
if(("attributes"!=C.type||e!=this.view.docView&&"contenteditable"!=C.attributeName)&&e&&!e.ignoreMutation(C)){var t,H
if("childList"==C.type){var i=C.previousSibling&&C.previousSibling.parentNode==C.target?L(C.previousSibling)+1:0
if(-1==i)return
t=e.localPosFromDOM(C.target,i,-1)
var V=C.nextSibling&&C.nextSibling.parentNode==C.target?L(C.nextSibling):C.target.childNodes.length
if(-1==V)return
H=e.localPosFromDOM(C.target,V,1)}else"attributes"==C.type?(t=e.posAtStart-e.border,H=e.posAtEnd+e.border):(t=e.posAtStart,H=e.posAtEnd,C.target.nodeValue==C.oldValue&&(kC.start(this.view).typeOver=!0))
kC.start(this.view).addRange(t,H)}}}
var _C={},zC={}
function WC(C){C.someProp("handleDOMEvents",function(e){for(var t in e)C.eventHandlers[t]||C.dom.addEventListener(t,C.eventHandlers[t]=function(e){return jC(C,e)})})}function jC(C,e){return C.someProp("handleDOMEvents",function(t){var H=t[e.type]
return!!H&&(H(C,e)||e.defaultPrevented)})}function UC(C){return{left:C.clientX,top:C.clientY}}zC.keydown=function(C,e){if(C.shiftKey=16==e.keyCode||e.shiftKey,C.inDOMChange){if(C.inDOMChange.composing)return
if(C.inDOMChange.ignoreKeyDownOnCompositionEnd(e))return
C.inDOMChange.finish()}C.lastKeyCode=e.keyCode,C.lastKeyCodeTime=Date.now(),C.someProp("handleKeyDown",function(t){return t(C,e)})||sC(C,e)?e.preventDefault():C.selectionReader.poll("key")},zC.keyup=function(C,e){16==e.keyCode&&(C.shiftKey=!1)},zC.keypress=function(C,e){if(!(C.inDOMChange||!e.charCode||e.ctrlKey&&!e.altKey||t.mac&&e.metaKey))if(C.someProp("handleKeyPress",function(t){return t(C,e)}))e.preventDefault()
else{var H=C.state.selection
if(!(H instanceof dV.TextSelection&&H.$from.sameParent(H.$to))){var i=String.fromCharCode(e.charCode)
C.someProp("handleTextInput",function(e){return e(C,H.$from.pos,H.$to.pos,i)})||C.dispatch(C.state.tr.insertText(i).scrollIntoView()),e.preventDefault()}}}
var GC={time:0,x:0,y:0,type:""}
function $C(C,e,t,H,i){if(-1==H)return!1
for(var V=C.state.doc.resolve(H),n=function(H){if(C.someProp(e,function(e){return H>V.depth?e(C,t,V.nodeAfter,V.before(H),i,!0):e(C,t,V.node(H),V.before(H),i,!1)}))return{v:!0}},r=V.depth+1;r>0;r--){var L=n(r)
if(L)return L.v}return!1}function qC(C,e,t){C.focused||C.focus()
var H=C.state.tr.setSelection(e)
"pointer"==t&&H.setMeta("pointer",!0),C.dispatch(H)}function KC(C,e,t,H,i){return $C(C,"handleClickOn",e,t,H)||C.someProp("handleClick",function(t){return t(C,e,H)})||(i?function(C,e){if(-1==e)return!1
var t,H,i=C.state.selection
i instanceof dV.NodeSelection&&(t=i.node)
for(var V=C.state.doc.resolve(e),n=V.depth+1;n>0;n--){var r=n>V.depth?V.nodeAfter:V.node(n)
if(dV.NodeSelection.isSelectable(r)){H=t&&i.$from.depth>0&&n>=i.$from.depth&&V.before(i.$from.depth+1)==i.$from.pos?V.before(i.$from.depth):V.before(n)
break}}return null!=H&&(qC(C,dV.NodeSelection.create(C.state.doc,H),"pointer"),!0)}(C,t):function(C,e){if(-1==e)return!1
var t=C.state.doc.resolve(e),H=t.nodeAfter
return!!(H&&H.isAtom&&dV.NodeSelection.isSelectable(H))&&(qC(C,new dV.NodeSelection(t),"pointer"),!0)}(C,t))}function JC(C,e,t,H){return $C(C,"handleTripleClickOn",e,t,H)||C.someProp("handleTripleClick",function(t){return t(C,e,H)})||function(C,e){var t=C.state.doc
if(-1==e)return!!t.inlineContent&&(qC(C,dV.TextSelection.create(t,0,t.content.size),"pointer"),!0)
for(var H=t.resolve(e),i=H.depth+1;i>0;i--){var V=i>H.depth?H.nodeAfter:H.node(i),n=H.before(i)
if(V.inlineContent)qC(C,dV.TextSelection.create(t,n+1,n+1+V.content.size),"pointer")
else{if(!dV.NodeSelection.isSelectable(V))continue
qC(C,dV.NodeSelection.create(t,n),"pointer")}return!0}}(C,t)}function YC(C){return!!C.inDOMChange&&(C.inDOMChange.finish(!0),!0)}var XC=t.mac?"metaKey":"ctrlKey"
_C.mousedown=function(C,e){C.shiftKey=e.shiftKey
var t=YC(C),H=Date.now(),i="singleClick"
H-GC.time<500&&function(C,e){var t=e.x-C.clientX,H=e.y-C.clientY
return t*t+H*H<100}(e,GC)&&!e[XC]&&("singleClick"==GC.type?i="doubleClick":"doubleClick"==GC.type&&(i="tripleClick")),GC={time:H,x:e.clientX,y:e.clientY,type:i}
var V=C.posAtCoords(UC(e))
V&&("singleClick"==i?C.mouseDown=new QC(C,V,e,t):("doubleClick"==i?function(C,e,t,H){return $C(C,"handleDoubleClickOn",e,t,H)||C.someProp("handleDoubleClick",function(t){return t(C,e,H)})}:JC)(C,V.pos,V.inside,e)?e.preventDefault():C.selectionReader.poll("pointer"))}
var QC=function(C,e,H,i){var V,n,r=this
if(this.view=C,this.pos=e,this.event=H,this.flushed=i,this.selectNode=H[XC],this.allowDefault=H.shiftKey,e.inside>-1)V=C.state.doc.nodeAt(e.inside),n=e.inside
else{var L=C.state.doc.resolve(e.pos)
V=L.parent,n=L.depth?L.before():0}this.mightDrag=null
var o=i?null:H.target,s=o?C.docView.nearestDesc(o,!0):null
this.target=s?s.dom:null,(V.type.spec.draggable&&!1!==V.type.spec.selectable||C.state.selection instanceof dV.NodeSelection&&n==C.state.selection.from)&&(this.mightDrag={node:V,pos:n,addAttr:this.target&&!this.target.draggable,setUneditable:this.target&&t.gecko&&!this.target.hasAttribute("contentEditable")}),this.target&&this.mightDrag&&(this.mightDrag.addAttr||this.mightDrag.setUneditable)&&(this.view.domObserver.stop(),this.mightDrag.addAttr&&(this.target.draggable=!0),this.mightDrag.setUneditable&&setTimeout(function(){return r.target.setAttribute("contentEditable","false")},20),this.view.domObserver.start()),C.root.addEventListener("mouseup",this.up=this.up.bind(this)),C.root.addEventListener("mousemove",this.move=this.move.bind(this)),C.selectionReader.poll("pointer")}
QC.prototype.done=function(){this.view.root.removeEventListener("mouseup",this.up),this.view.root.removeEventListener("mousemove",this.move),this.mightDrag&&this.target&&(this.view.domObserver.stop(),this.mightDrag.addAttr&&(this.target.draggable=!1),this.mightDrag.setUneditable&&this.target.removeAttribute("contentEditable"),this.view.domObserver.start()),this.view.mouseDown=null},QC.prototype.up=function(C){this.done(),this.view.dom.contains(3==C.target.nodeType?C.target.parentNode:C.target)&&(this.allowDefault?(t.ie&&bC(this.view.state)&&this.view.updateState(this.view.state),this.view.selectionReader.poll("pointer")):KC(this.view,this.pos.pos,this.pos.inside,C,this.selectNode)?C.preventDefault():!this.flushed&&(!t.chrome||this.view.state.selection instanceof dV.TextSelection||this.pos.pos!=this.view.state.selection.from&&this.pos.pos!=this.view.state.selection.to)?this.view.selectionReader.poll("pointer"):(qC(this.view,dV.Selection.near(this.view.state.doc.resolve(this.pos.pos)),"pointer"),C.preventDefault()))},QC.prototype.move=function(C){!this.allowDefault&&(Math.abs(this.event.x-C.clientX)>4||Math.abs(this.event.y-C.clientY)>4)&&(this.allowDefault=!0),this.view.selectionReader.poll("pointer")},_C.touchdown=function(C){YC(C),C.selectionReader.poll("pointer")},_C.contextmenu=function(C){return YC(C)},zC.compositionstart=zC.compositionupdate=function(C){kC.start(C,!0)},zC.compositionend=function(C,e){if(!C.inDOMChange){if(!e.data)return
kC.start(C,!0)}C.inDOMChange.compositionEnd(e)},zC.input=function(C){var e=kC.start(C)
e.composing||e.finish()}
var Ce=t.ie&&t.ie_version<15||t.ios&&t.webkit_version<604
function ee(C,e,t,H){var i=EC(C,e,t,C.shiftKey,C.state.selection.$from)
if(!i)return!1
if(C.someProp("handlePaste",function(e){return e(C,H,i)}))return!0
var V=function(C){return 0==C.openStart&&0==C.openEnd&&1==C.content.childCount?C.content.firstChild:null}(i),n=V?C.state.tr.replaceSelectionWith(V,C.shiftKey):C.state.tr.replaceSelection(i)
return C.dispatch(n.scrollIntoView().setMeta("paste",!0).setMeta("uiEvent","paste")),!0}_C.copy=zC.cut=function(C,e){var t=C.state.selection,H="cut"==e.type
if(!t.empty){var i=Ce?null:e.clipboardData,V=BC(C,t.content()),n=V.dom,r=V.text
i?(e.preventDefault(),i.clearData(),i.setData("text/html",n.innerHTML),i.setData("text/plain",r)):function(C,e){var t=e.ownerDocument,H=t.body.appendChild(t.createElement("div"))
H.appendChild(e),H.style.cssText="position: fixed; left: -10000px; top: 10px"
var i=getSelection(),V=t.createRange()
V.selectNodeContents(e),C.dom.blur(),i.removeAllRanges(),i.addRange(V),setTimeout(function(){t.body.removeChild(H),C.focus()},50)}(C,n),H&&C.dispatch(C.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent","cut"))}},zC.paste=function(C,e){var t=Ce?null:e.clipboardData
t&&(ee(C,t.getData("text/plain"),t.getData("text/html"),e)||t.files.length>0)?e.preventDefault():function(C,e){var t=C.dom.ownerDocument,H=C.shiftKey||C.state.selection.$from.parent.type.spec.code,i=t.body.appendChild(t.createElement(H?"textarea":"div"))
H||(i.contentEditable="true"),i.style.cssText="position: fixed; left: -10000px; top: 10px",i.focus(),setTimeout(function(){C.focus(),t.body.removeChild(i),H?ee(C,i.value,null,e):ee(C,i.textContent,i.innerHTML,e)},50)}(C,e)}
var te=function(C,e){this.slice=C,this.move=e},He=t.mac?"altKey":"ctrlKey"
for(var ie in _C.dragstart=function(C,e){var t=C.mouseDown
if(t&&t.done(),e.dataTransfer){var H=C.state.selection,i=H.empty?null:C.posAtCoords(UC(e))
if(i&&i.pos>=H.from&&i.pos<=(H instanceof dV.NodeSelection?H.to-1:H.to));else if(t&&t.mightDrag)C.dispatch(C.state.tr.setSelection(dV.NodeSelection.create(C.state.doc,t.mightDrag.pos)))
else if(e.target&&1==e.target.nodeType){var V=C.docView.nearestDesc(e.target,!0)
if(!V||!V.node.type.spec.draggable||V==C.docView)return
C.dispatch(C.state.tr.setSelection(dV.NodeSelection.create(C.state.doc,V.posBefore)))}var n=C.state.selection.content(),r=BC(C,n),L=r.dom,o=r.text
e.dataTransfer.clearData(),e.dataTransfer.setData(Ce?"Text":"text/html",L.innerHTML),Ce||e.dataTransfer.setData("text/plain",o),C.dragging=new te(n,!e[He])}},_C.dragend=function(C){window.setTimeout(function(){return C.dragging=null},50)},zC.dragover=zC.dragenter=function(C,e){return e.preventDefault()},zC.drop=function(C,e){var t=C.dragging
if(C.dragging=null,e.dataTransfer){var H=C.posAtCoords(UC(e))
if(H){var i=C.state.doc.resolve(H.pos)
if(i){var V=t&&t.slice||EC(C,e.dataTransfer.getData(Ce?"Text":"text/plain"),Ce?null:e.dataTransfer.getData("text/html"),!1,i)
if(V&&(e.preventDefault(),!C.someProp("handleDrop",function(H){return H(C,e,V,t&&t.move)}))){var n=V?aV.dropPoint(C.state.doc,i.pos,V):i.pos
null==n&&(n=i.pos)
var r=C.state.tr
t&&t.move&&r.deleteSelection()
var L=r.mapping.map(n),o=0==V.openStart&&0==V.openEnd&&1==V.content.childCount,s=r.doc
if(o?r.replaceRangeWith(L,L,V.content.firstChild):r.replaceRange(L,L,V),!r.doc.eq(s)){var a=r.doc.resolve(L)
o&&dV.NodeSelection.isSelectable(V.content.firstChild)&&a.nodeAfter&&a.nodeAfter.sameMarkup(V.content.firstChild)?r.setSelection(new dV.NodeSelection(a)):r.setSelection(gC(C,a,r.doc.resolve(r.mapping.map(n)))),C.focus(),C.dispatch(r.setMeta("uiEvent","drop"))}}}}}},_C.focus=function(C){C.focused||(C.dom.classList.add("ProseMirror-focused"),C.focused=!0)},_C.blur=function(C){C.focused&&(C.dom.classList.remove("ProseMirror-focused"),C.focused=!1)},zC)_C[ie]=zC[ie]
function Ve(C,e){if(C==e)return!0
for(var t in C)if(C[t]!==e[t])return!1
for(var H in e)if(!(H in C))return!1
return!0}var ne=function(C,e){this.spec=e||Me,this.side=this.spec.side||0,this.toDOM=C}
ne.prototype.map=function(C,e,t,H){var i=C.mapResult(e.from+H,this.side<0?-1:1),V=i.pos
return i.deleted?null:new oe(V-t,V-t,this)},ne.prototype.valid=function(){return!0},ne.prototype.eq=function(C){return this==C||C instanceof ne&&(this.spec.key&&this.spec.key==C.spec.key||this.toDOM==C.toDOM&&Ve(this.spec,C.spec))}
var re=function(C,e){this.spec=e||Me,this.attrs=C}
re.prototype.map=function(C,e,t,H){var i=C.map(e.from+H,this.spec.inclusiveStart?-1:1)-t,V=C.map(e.to+H,this.spec.inclusiveEnd?1:-1)-t
return i>=V?null:new oe(i,V,this)},re.prototype.valid=function(C,e){return e.from<e.to},re.prototype.eq=function(C){return this==C||C instanceof re&&Ve(this.attrs,C.attrs)&&Ve(this.spec,C.spec)},re.is=function(C){return C.type instanceof re}
var Le=function(C,e){this.spec=e||Me,this.attrs=C}
Le.prototype.map=function(C,e,t,H){var i=C.mapResult(e.from+H,1)
if(i.deleted)return null
var V=C.mapResult(e.to+H,-1)
return V.deleted||V.pos<=i.pos?null:new oe(i.pos-t,V.pos-t,this)},Le.prototype.valid=function(C,e){var t=C.content.findIndex(e.from),H=t.index,i=t.offset
return i==e.from&&i+C.child(H).nodeSize==e.to},Le.prototype.eq=function(C){return this==C||C instanceof Le&&Ve(this.attrs,C.attrs)&&Ve(this.spec,C.spec)}
var oe=function(C,e,t){this.from=C,this.to=e,this.type=t},se={spec:{}}
oe.prototype.copy=function(C,e){return new oe(C,e,this.type)},oe.prototype.eq=function(C){return this.type.eq(C.type)&&this.from==C.from&&this.to==C.to},oe.prototype.map=function(C,e,t){return this.type.map(C,this,e,t)},oe.widget=function(C,e,t){return new oe(C,C,new ne(e,t))},oe.inline=function(C,e,t,H){return new oe(C,e,new re(t,H))},oe.node=function(C,e,t,H){return new oe(C,e,new Le(t,H))},se.spec.get=function(){return this.type.spec},Object.defineProperties(oe.prototype,se)
var ae=[],Me={},le=function(C,e){this.local=C&&C.length?C:ae,this.children=e&&e.length?e:ae}
le.create=function(C,e){return e.length?me(e,C,0,Me):de},le.prototype.find=function(C,e,t){var H=[]
return this.findInner(null==C?0:C,null==e?1e9:e,H,0,t),H},le.prototype.findInner=function(C,e,t,H,i){for(var V=0;V<this.local.length;V++){var n=this.local[V]
n.from<=e&&n.to>=C&&(!i||i(n.spec))&&t.push(n.copy(n.from+H,n.to+H))}for(var r=0;r<this.children.length;r+=3)if(this.children[r]<e&&this.children[r+1]>C){var L=this.children[r]+1
this.children[r+2].findInner(C-L,e-L,t,H+L,i)}},le.prototype.map=function(C,e,t){return this==de||0==C.maps.length?this:this.mapInner(C,e,0,0,t||Me)},le.prototype.mapInner=function(C,e,t,H,i){for(var V,n=0;n<this.local.length;n++){var r=this.local[n].map(C,t,H)
r&&r.type.valid(e,r)?(V||(V=[])).push(r):i.onRemove&&i.onRemove(this.local[n].spec)}return this.children.length?function(C,e,t,H,i,V,n){for(var r=C.slice(),L=function(C,e,t,H){for(var n=0;n<r.length;n+=3){var L=r[n+1],o=void 0;-1==L||C>L+V||(e>=r[n]+V?r[n+1]=-1:(o=H-t-(e-C)+(V-i))&&(r[n]+=o,r[n+1]+=o))}},o=0;o<t.maps.length;o++)t.maps[o].forEach(L)
for(var s=!1,a=0;a<r.length;a+=3)if(-1==r[a+1]){var M=t.map(r[a]+V),l=M-i
if(l<0||l>=H.content.size){s=!0
continue}var d=t.map(C[a+1]+V,-1),c=d-i,u=H.content.findIndex(l),h=u.index,p=u.offset,m=H.maybeChild(h)
if(m&&p==l&&p+m.nodeSize==c){var f=r[a+2].mapInner(t,m,M+1,r[a]+V+1,n)
f!=de?(r[a]=l,r[a+1]=c,r[a+2]=f):(r[a+1]=-2,s=!0)}else s=!0}if(s){var g=function(C,e,t,H,i,V,n){function r(C,e){for(var V=0;V<C.local.length;V++){var L=C.local[V].map(H,i,e)
L?t.push(L):n.onRemove&&n.onRemove(C.local[V].spec)}for(var o=0;o<C.children.length;o+=3)r(C.children[o+2],C.children[o]+e+1)}for(var L=0;L<C.length;L+=3)-1==C[L+1]&&r(C[L+2],e[L]+V+1)
return t}(r,C,e||[],t,i,V,n),Z=me(g,H,0,n)
e=Z.local
for(var v=0;v<r.length;v+=3)r[v+1]<0&&(r.splice(v,3),v-=3)
for(var y=0,b=0;y<Z.children.length;y+=3){for(var k=Z.children[y];b<r.length&&r[b]<k;)b+=3
r.splice(b,0,Z.children[y],Z.children[y+1],Z.children[y+2])}}return new le(e&&e.sort(fe),r)}(this.children,V,C,e,t,H,i):V?new le(V.sort(fe)):de},le.prototype.add=function(C,e){return e.length?this==de?le.create(C,e):this.addInner(C,e,0):this},le.prototype.addInner=function(C,e,t){var H,i=this,V=0
C.forEach(function(C,n){var r,L=n+t
if(r=he(e,C,L)){for(H||(H=i.children.slice());V<H.length&&H[V]<n;)V+=3
H[V]==n?H[V+2]=H[V+2].addInner(C,r,L+1):H.splice(V,0,n,n+C.nodeSize,me(r,C,L+1,Me)),V+=3}})
var n=ue(V?pe(e):e,-t)
return new le(n.length?this.local.concat(n).sort(fe):this.local,H||this.children)},le.prototype.remove=function(C){return 0==C.length||this==de?this:this.removeInner(C,0)},le.prototype.removeInner=function(C,e){for(var t=this.children,H=this.local,i=0;i<t.length;i+=3){for(var V=void 0,n=t[i]+e,r=t[i+1]+e,L=0,o=void 0;L<C.length;L++)(o=C[L])&&o.from>n&&o.to<r&&(C[L]=null,(V||(V=[])).push(o))
if(V){t==this.children&&(t=this.children.slice())
var s=t[i+2].removeInner(V,n+1)
s!=de?t[i+2]=s:(t.splice(i,3),i-=3)}}if(H.length)for(var a=0,M=void 0;a<C.length;a++)if(M=C[a])for(var l=0;l<H.length;l++)H[l].type.eq(M.type)&&(H==this.local&&(H=this.local.slice()),H.splice(l--,1))
return t==this.children&&H==this.local?this:H.length||t.length?new le(H,t):de},le.prototype.forChild=function(C,e){var t,H
if(this==de)return this
if(e.isLeaf)return le.empty
for(var i=0;i<this.children.length;i+=3)if(this.children[i]>=C){this.children[i]==C&&(t=this.children[i+2])
break}for(var V=C+1,n=V+e.content.size,r=0;r<this.local.length;r++){var L=this.local[r]
if(L.from<n&&L.to>V&&L.type instanceof re){var o=Math.max(V,L.from)-V,s=Math.min(n,L.to)-V
o<s&&(H||(H=[])).push(L.copy(o,s))}}if(H){var a=new le(H.sort(fe))
return t?new ce([a,t]):a}return t||de},le.prototype.eq=function(C){if(this==C)return!0
if(!(C instanceof le)||this.local.length!=C.local.length||this.children.length!=C.children.length)return!1
for(var e=0;e<this.local.length;e++)if(!this.local[e].eq(C.local[e]))return!1
for(var t=0;t<this.children.length;t+=3)if(this.children[t]!=C.children[t]||this.children[t+1]!=C.children[t+1]||!this.children[t+2].eq(C.children[t+2]))return!1
return!1},le.prototype.locals=function(C){return ge(this.localsInner(C))},le.prototype.localsInner=function(C){if(this==de)return ae
if(C.inlineContent||!this.local.some(re.is))return this.local
for(var e=[],t=0;t<this.local.length;t++)this.local[t].type instanceof re||e.push(this.local[t])
return e}
var de=new le
le.empty=de,le.removeOverlap=ge
var ce=function(C){this.members=C}
function ue(C,e){if(!e||!C.length)return C
for(var t=[],H=0;H<C.length;H++){var i=C[H]
t.push(new oe(i.from+e,i.to+e,i.type))}return t}function he(C,e,t){if(e.isLeaf)return null
for(var H=t+e.nodeSize,i=null,V=0,n=void 0;V<C.length;V++)(n=C[V])&&n.from>t&&n.to<H&&((i||(i=[])).push(n),C[V]=null)
return i}function pe(C){for(var e=[],t=0;t<C.length;t++)null!=C[t]&&e.push(C[t])
return e}function me(C,e,t,H){var i=[],V=!1
e.forEach(function(e,n){var r=he(C,e,n+t)
if(r){V=!0
var L=me(r,e,t+n+1,H)
L!=de&&i.push(n,n+e.nodeSize,L)}})
for(var n=ue(V?pe(C):C,-t).sort(fe),r=0;r<n.length;r++)n[r].type.valid(e,n[r])||(H.onRemove&&H.onRemove(n[r].spec),n.splice(r--,1))
return n.length||i.length?new le(n,i):de}function fe(C,e){return C.from-e.from||C.to-e.to}function ge(C){for(var e=C,t=0;t<e.length-1;t++){var H=e[t]
if(H.from!=H.to)for(var i=t+1;i<e.length;i++){var V=e[i]
if(V.from!=H.from){V.from<H.to&&(e==C&&(e=C.slice()),e[t]=H.copy(H.from,V.from),Ze(e,i,H.copy(V.from,H.to)))
break}V.to!=H.to&&(e==C&&(e=C.slice()),e[i]=V.copy(V.from,H.to),Ze(e,i+1,V.copy(H.to,V.to)))}}return e}function Ze(C,e,t){for(;e<C.length&&fe(t,C[e])>0;)e++
C.splice(e,0,t)}function ve(C){var e=[]
return C.someProp("decorations",function(t){var H=t(C.state)
H&&H!=de&&e.push(H)}),C.cursorWrapper&&e.push(le.create(C.state.doc,[C.cursorWrapper.deco])),ce.from(e)}ce.prototype.forChild=function(C,e){if(e.isLeaf)return le.empty
for(var t=[],H=0;H<this.members.length;H++){var i=this.members[H].forChild(C,e)
i!=de&&(i instanceof ce?t=t.concat(i.members):t.push(i))}return ce.from(t)},ce.prototype.eq=function(C){if(!(C instanceof ce)||C.members.length!=this.members.length)return!1
for(var e=0;e<this.members.length;e++)if(!this.members[e].eq(C.members[e]))return!1
return!0},ce.prototype.locals=function(C){for(var e,t=!0,H=0;H<this.members.length;H++){var i=this.members[H].localsInner(C)
if(i.length)if(e){t&&(e=e.slice(),t=!1)
for(var V=0;V<i.length;V++)e.push(i[V])}else e=i}return e?ge(t?e:e.sort(fe)):ae},ce.from=function(C){switch(C.length){case 0:return de
case 1:return C[0]
default:return new ce(C)}}
var ye=function(C,e){this._props=e,this.state=e.state,this.dispatch=this.dispatch.bind(this),this._root=null,this.focused=!1,this.dom=C&&C.mount||document.createElement("div"),C&&(C.appendChild?C.appendChild(this.dom):C.apply?C(this.dom):C.mount&&(this.mounted=!0)),this.editable=Se(this),this.redraw=!1,this.cursorWrapper=null,we(this),this.nodeViews=xe(this),this.docView=R(this.state.doc,ke(this),ve(this),this.dom,this),this.lastSelectedViewDesc=null,this.dragging=null,function(C){C.shiftKey=!1,C.mouseDown=null,C.inDOMChange=null,C.lastKeyCode=null,C.lastKeyCodeTime=0,C.domObserver=new IC(C),C.domObserver.start(),C.eventHandlers=Object.create(null)
var e=function(e){var t=_C[e]
C.dom.addEventListener(e,C.eventHandlers[e]=function(e){!function(C,e){if(!e.bubbles)return!0
if(e.defaultPrevented)return!1
for(var t=e.target;t!=C.dom;t=t.parentNode)if(!t||11==t.nodeType||t.pmViewDesc&&t.pmViewDesc.stopEvent(e))return!1
return!0}(C,e)||jC(C,e)||!C.editable&&e.type in zC||t(C,e)})}
for(var t in _C)e(t)
WC(C)}(this),this.selectionReader=new lC(this),this.pluginViews=[],this.updatePluginViews()},be={props:{},root:{}}
function ke(C){var e=Object.create(null)
return e.class="ProseMirror",e.contenteditable=String(C.editable),C.someProp("attributes",function(t){if("function"==typeof t&&(t=t(C.state)),t)for(var H in t)"class"==H?e.class+=" "+t[H]:e[H]||"contenteditable"==H||"nodeName"==H||(e[H]=String(t[H]))}),[oe.node(0,C.state.doc.content.size,e)]}function we(C){var e=bC(C.state)
if(!e||t.ie&&C.mouseDown)C.cursorWrapper=null
else{var H,i=C.state.selection.visible,V=C.state.storedMarks||e.marks()
C.cursorWrapper&&oV.Mark.sameSet(C.cursorWrapper.deco.spec.marks,V)&&"\ufeff"==C.cursorWrapper.dom.textContent&&C.cursorWrapper.deco.spec.visible==i?C.cursorWrapper.deco.pos!=e.pos&&(H=C.cursorWrapper.dom):H=function(C){var e=document.createElement("span")
return e.textContent="\ufeff",C||(e.style.position="absolute",e.style.left="-100000px"),e}(i),H&&(C.cursorWrapper={dom:H,deco:oe.widget(e.pos,H,{isCursorWrapper:!0,marks:V,raw:!0,visible:i})})}}function Se(C){return!C.someProp("editable",function(e){return!1===e(C.state)})}function Oe(C){var e=C.getSelection(),t=e.focusOffset,H=e.focusNode
return H&&3!=H.nodeType?[H,t,1==H.nodeType?H.childNodes[t-1]:null,1==H.nodeType?H.childNodes[t]:null]:null}function xe(C){var e={}
return C.someProp("nodeViews",function(C){for(var t in C)Object.prototype.hasOwnProperty.call(e,t)||(e[t]=C[t])}),e}be.props.get=function(){if(this._props.state!=this.state){var C=this._props
for(var e in this._props={},C)this._props[e]=C[e]
this._props.state=this.state}return this._props},ye.prototype.update=function(C){C.handleDOMEvents!=this._props.handleDOMEvents&&WC(this),this._props=C
var e=xe(this);(function(C,e){var t=0,H=0
for(var i in C){if(C[i]!=e[i])return!0
t++}for(var V in e)H++
return t!=H})(e,this.nodeViews)&&(this.nodeViews=e,this.redraw=!0),this.updateState(C.state)},ye.prototype.setProps=function(C){var e={}
for(var t in this._props)e[t]=this._props[t]
for(var H in e.state=this.state,C)e[H]=C[H]
this.update(e)},ye.prototype.updateState=function(C){var e=this,H=this.state
if(this.state=C,H.plugins!=C.plugins&&WC(this),this.domObserver.flush(),!this.inDOMChange||!this.inDOMChange.stateUpdated(C)){var i=this.editable
this.editable=Se(this),we(this)
var V,n,r,L=ve(this),s=ke(this),M=H.config!=C.config?"reset":C.scrollToSelection>H.scrollToSelection?"to selection":"preserve",l=this.redraw||!this.docView.matchesNode(C.doc,s,L),d=l||!C.selection.eq(H.selection)||this.selectionReader.domChanged(),c="preserve"==M&&d&&function(C){for(var e,t,H=C.dom.getBoundingClientRect(),i=Math.max(0,H.top),V=C.dom.ownerDocument,n=(H.left+H.right)/2,r=i+1;r<Math.min(innerHeight,H.bottom);r+=5){var L=C.root.elementFromPoint(n,r)
if(L!=C.dom&&C.dom.contains(L)){var s=L.getBoundingClientRect()
if(s.top>=i-20){e=L,t=s.top
break}}}for(var a=[],M=C.dom;M&&(a.push({dom:M,top:M.scrollTop,left:M.scrollLeft}),M!=V.body);M=o(M));return{refDOM:e,refTop:t,stack:a}}(this)
if(d){this.domObserver.stop()
var u=!1
if(l){var h=t.chrome&&Oe(this.root)
!this.redraw&&this.docView.update(C.doc,s,L,this)||(this.docView.destroy(),this.docView=R(C.doc,s,L,this.dom,this),this.redraw=!1),this.selectionReader.clearDOMState(),h&&(u=function(C,e){var t=Oe(e)
if(!t||3==t[0].nodeType)return!1
for(var H=0;H<C.length;H++)if(t[H]!=C[H])return!0
return!1}(h,this.root))}u||!(this.mouseDown&&this.selectionReader.domChanged()&&(V=this,n=V.docView.domFromPos(V.state.selection.anchor),r=V.root.getSelection(),a(n.node,n.offset,r.anchorNode,r.anchorOffset)))?uC(this,!1,u):mC(this,C.selection),this.domObserver.start()}if(i!=this.editable&&this.selectionReader.editableChanged(),this.updatePluginViews(H),"reset"==M)this.dom.scrollTop=0
else if("to selection"==M){var m=this.root.getSelection().focusNode
this.someProp("handleScrollToSelection",function(C){return C(e)})||(C.selection instanceof dV.NodeSelection?p(this,this.docView.domAfterPos(C.selection.from).getBoundingClientRect(),m):p(this,this.coordsAtPos(C.selection.head),m))}else c&&function(C){for(var e=C.refDOM,t=C.refTop,H=C.stack,i=e?e.getBoundingClientRect().top:0,V=0==i?0:i-t,n=0;n<H.length;n++){var r=H[n],L=r.dom,o=r.top,s=r.left
L.scrollTop!=o+V&&(L.scrollTop=o+V),L.scrollLeft!=s&&(L.scrollLeft=s)}}(c)}},ye.prototype.destroyPluginViews=function(){for(var C;C=this.pluginViews.pop();)C.destroy&&C.destroy()},ye.prototype.updatePluginViews=function(C){var e=this.state.plugins
if(C&&C.plugins==e)for(var t=0;t<this.pluginViews.length;t++){var H=this.pluginViews[t]
H.update&&H.update(this,C)}else{this.destroyPluginViews()
for(var i=0;i<e.length;i++){var V=e[i]
V.spec.view&&this.pluginViews.push(V.spec.view(this))}}},ye.prototype.someProp=function(C,e){var t,H=this._props&&this._props[C]
if(null!=H&&(t=e?e(H):H))return t
var i=this.state.plugins
if(i)for(var V=0;V<i.length;V++){var n=i[V].props[C]
if(null!=n&&(t=e?e(n):n))return t}},ye.prototype.hasFocus=function(){return this.root.activeElement==this.dom},ye.prototype.focus=function(){this.domObserver.stop(),uC(this,!0),this.domObserver.start(),this.editable&&this.dom.focus()},be.root.get=function(){var C=this._root
if(null==C)for(var e=this.dom.parentNode;e;e=e.parentNode)if(9==e.nodeType||11==e.nodeType&&e.host)return this._root=e
return C||document},ye.prototype.posAtCoords=function(C){var e=g(this,C)
return this.inDOMChange&&e&&(e.pos=this.inDOMChange.mapping.map(e.pos),-1!=e.inside&&(e.inside=this.inDOMChange.mapping.map(e.inside))),e},ye.prototype.coordsAtPos=function(C){return this.inDOMChange&&(C=this.inDOMChange.mapping.invert().map(C)),v(this,C)},ye.prototype.domAtPos=function(C){return this.inDOMChange&&(C=this.inDOMChange.mapping.invert().map(C)),this.docView.domFromPos(C)},ye.prototype.nodeDOM=function(C){this.inDOMChange&&(C=this.inDOMChange.mapping.invert().map(C))
var e=this.docView.descAt(C)
return e?e.nodeDOM:null},ye.prototype.posAtDOM=function(C,e,t){void 0===t&&(t=-1)
var H=this.docView.posFromDOM(C,e,t)
if(null==H)throw new RangeError("DOM position not inside the editor")
return this.inDOMChange&&(H=this.inDOMChange.mapping.map(H)),H},ye.prototype.endOfTextblock=function(C,e){return x(this,e||this.state,C)},ye.prototype.destroy=function(){this.docView&&(function(C){for(var e in C.domObserver.stop(),C.inDOMChange&&C.inDOMChange.destroy(),C.eventHandlers)C.dom.removeEventListener(e,C.eventHandlers[e])}(this),this.destroyPluginViews(),this.selectionReader.destroy(),this.mounted?(this.docView.update(this.state.doc,[],ve(this),this),this.dom.textContent=""):this.dom.parentNode&&this.dom.parentNode.removeChild(this.dom),this.docView.destroy(),this.docView=null)},ye.prototype.dispatchEvent=function(C){return function(C,e){jC(C,e)||!_C[e.type]||!C.editable&&e.type in zC||_C[e.type](C,e)}(this,C)},ye.prototype.dispatch=function(C){var e=this._props.dispatchTransaction
e?e.call(this,C):this.updateState(this.state.apply(C))},Object.defineProperties(ye.prototype,be),e.EditorView=ye,e.Decoration=oe,e.DecorationSet=le,e.__serializeForClipboard=BC,e.__parseFromClipboard=EC}))
VV(_V)
var zV=_V.EditorView
_V.Decoration,_V.DecorationSet,_V.__serializeForClipboard,_V.__parseFromClipboard
class WV extends MV{constructor(C,e,t="SetDocAttr"){super(),this.stepType=t,this.key=C,this.value=e}apply(C){return this.prevValue=C.attrs[this.key],C.attrs[this.key]=this.value,lV.ok(C)}invert(){return new WV(this.key,this.prevValue,"revertSetDocAttr")}map(){return null}toJSON(){return{stepType:this.stepType,key:this.key,value:this.value}}static fromJSON(C){return new WV(C.key,C.value,C.stepType)}}function jV(C,e){let t=!1
C.forEach(C=>{C===e&&(t=!0)}),t||C.push(e)}function UV(C){let e=C.selection,t=[]
return e.from===e.to?(C.doc.nodeAt(e.from)&&C.doc.nodeAt(e.from).marks.forEach(C=>{jV(t,C)}),C.doc.nodeAt(e.from-1)&&C.doc.nodeAt(e.from-1).marks.forEach(C=>{(C.type.spec.inclusive||void 0===C.type.spec.inclusive)&&jV(t,C)}),C.storedMarks&&C.storedMarks.forEach(C=>{jV(t,C)})):C.doc.nodesBetween(e.from,e.to,C=>{C.marks.forEach(C=>{jV(t,C)})}),t}class GV extends K{constructor(){super(...arguments),this._guid=null,this.sourceText=null,this.editorView=null,this.status=null,this.schema=null}didInsertElement(){this.schema=new sV(this.args.schema)
let C=cV.create({schema:this.schema,doc:null,plugins:[bV(),IV({"Mod-z":kV,"Mod-y":wV}),IV(mV)]}),e=this
e.editorView=new zV(document.querySelector("#"+this.prosemirrorId),{state:C,dispatchTransaction(C){let t=e.editorView.state.apply(C)
e.stateChange(t),e.editorView.updateState(t)}})}didUpdate(){if(this.args.text!==this.sourceText){this.sourceText=this.args.text
let C=cV.create({schema:this.schema,doc:this.schema.nodeFromJSON(this.sourceText),plugins:[bV(),IV({"Mod-z":kV,"Mod-y":wV}),IV(mV)]})
this.editorView.updateState(C)}}get prosemirrorId(){return"tei-editor-prosemirror-"+iV(this)}stateChange(C){let e={block:null,blocks:null,marks:{}};(function(C){let e=C.selection,t=[]
for(let H=0;H<e.$anchor.path.length;H++)"object"==typeof e.$anchor.path[H]&&t.push(e.$anchor.path[H])
return t})(C).forEach(C=>{C.type.isBlock&&(null===e.blocks&&(e.blocks={}),e.blocks[C.type.name]=C,e.block=C)}),UV(C).forEach(C=>{e.marks[C.type.name]=C}),this.status=e,this.args.update(C.doc.toJSON())}menuAction(C,e,t,H){if(this.editorView.focus(),"ev.target.value"===t&&(t=H.target.value),"setDocAttribute"===C){let C=this.editorView.state.tr
C.step(new WV(e,t)),this.editorView.dispatch(C)}else if("setBlockType"===C)hV(this.schema.nodes[t],{})(this.editorView.state,this.editorView.dispatch)
else if("setBlockAttribute"===C){let C=this.editorView.state.selection.$from,H=Object.assign({},C.parent.attrs)
H[e]=t,hV(this.schema.nodes[C.parent.type.name],H)(this.editorView.state,this.editorView.dispatch)}else if("toggleBlockAttribute"===C){let C=this.editorView.state.selection.$from,t=Object.assign({},C.parent.attrs)
t[e]=!t[e],hV(this.schema.nodes[C.parent.type.name],t)(this.editorView.state,this.editorView.dispatch)}else if("setMarkAttribute"===C){e=e.split(".")
UV(this.editorView.state)
var i=this.editorView.state.selection
let C=i.$from,H=i.$to,V=this.editorView.state.tr
if(V.removeMark(C.pos,H.pos,this.schema.marks[e[0]]),t&&""!==t.trim()){let i={}
i[e[1]]=t,V.addMark(C.pos,H.pos,this.schema.marks[e[0]].create(i))}this.editorView.dispatch(V)}else"toggleMark"===C&&pV(this.schema.marks[e])(this.editorView.state,this.editorView.dispatch)}}(function(C,e,t,H){var i,V=arguments.length,n=V<3?e:null===H?H=Object.getOwnPropertyDescriptor(e,t):H
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(C,e,t,H)
else for(var r=C.length-1;r>=0;r--)(i=C[r])&&(n=(V<3?i(n):V>3?i(e,t,n):i(e,t))||n)
V>3&&n&&Object.defineProperty(e,t,n)})([R],GV.prototype,"status",void 0)
function $V(C){return"tei"===C?"http://www.tei-c.org/ns/1.0":"xml"===C?"http://www.w3.org/XML/1998/namespace":"http://www.tei-c.org/ns/1.0"}class qV{constructor(C){this.dom=C}evaluate(C,e,t){return this.dom.evaluate(e,C,$V,t,null)}firstNode(C,e){return this.evaluate(C,e,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue}nodeIterator(C,e){return this.evaluate(C,e,XPathResult.ORDERED_NODE_ITERATOR_TYPE)}stringValue(C,e){return this.evaluate(C,e,XPathResult.STRING_TYPE).stringValue}}class KV{constructor(C,e){let t=new DOMParser
this.dom=t.parseFromString(C,"application/xml"),this.xpath=new qV(this.dom),this.parser=e}parseAttrs(C,e,t){for(let H in e){let i=e[H],V=this.xpath.stringValue(C,i.selector)
null!==V&&(i.values?(V=V.split(" ")).forEach(C=>{void 0!==i.values[C]&&(t[H]=i.values[C])}):t[H]=V)}}parseMarks(C,e){let t=[]
for(let H in e){let i=e[H]
if(!0===i)t.push({type:H})
else{let e=this.xpath.stringValue(C,i.selector)
if(null!==e)if(i.values){let V=!1
if((e=e.split(" ")).forEach(C=>{i.values.indexOf(C)>=0&&(V=!0)}),V){let e={type:H,attrs:{}}
i.attrs&&this.parseAttrs(C,i.attrs,e.attrs),t.push(e)}}else{let e={type:H,attrs:{}}
i.attrs&&this.parseAttrs(C,i.attrs,e.attrs),t.push(e)}}}return t}parseInline(C,e){let t=[]
for(let H=0;H<C.length;H++){let i=C[H]
if(i.children.length>0){let C=this.parseInline(i.children,e)[0]
for(let H in e.inline){e.inline[H].forEach(e=>{null!==this.xpath.firstNode(i,"self::"+e.selector)&&(e.marks&&(C.marks=this.parseMarks(i,e.marks)),null!==C.text&&void 0!==C.text&&""!==C.text&&t.push(C))})}}else for(let C in e.inline){e.inline[C].forEach(e=>{if(null!==this.xpath.firstNode(i,"self::"+e.selector)){let H={type:C,marks:[],text:null}
e.text&&(H.text=this.xpath.stringValue(i,e.text)),e.marks&&(H.marks=this.parseMarks(i,e.marks)),null!==H.text&&void 0!==H.text&&""!==H.text&&t.push(H)}})}}return t}parseBlocks(C,e){let t=C.iterateNext(),H=[]
for(;t;){for(let C in e.blocks){let i=e.blocks[C]
if(i&&null!==this.xpath.firstNode(t,"self::"+i.selector)){let V={type:C,attrs:{},content:this.parseInline(t.children,e)}
i.attrs&&this.parseAttrs(t,i.attrs,V.attrs),H.push(V)
break}}t=C.iterateNext()}return H}get body(){return this._body||(this._body={type:"doc",content:this.parseBlocks(this.xpath.nodeIterator(this.dom.documentElement,this.parser.mainText.selector),this.parser.mainText)}),this._body}get globalAnnotationText(){return this._globalAnnotationText||(this._globalAnnotationText={type:"doc",content:this.parseBlocks(this.xpath.nodeIterator(this.dom.documentElement,this.parser.globalAnnotations.selector),this.parser.globalAnnotations)}),this._globalAnnotationText}get individualAnnotations(){if(!this._individualAnnotations){this._individualAnnotations=[]
let C=this.xpath.nodeIterator(this.dom.documentElement,this.parser.individualAnnotations.selector),e=C.iterateNext()
for(;e;)this._individualAnnotations.push({type:"doc",attrs:{id:this.xpath.stringValue(e,"@xml:id")},content:this.parseBlocks(this.xpath.nodeIterator(e,this.parser.individualAnnotations.blockSelector),this.parser.individualAnnotations)}),e=C.iterateNext()}return this._individualAnnotations}buildForest(C){let e=C.iterateNext(),t={}
for(;e;){let H=Object.assign({_attrs:{},_text:0===e.children.length?this.xpath.stringValue(e,"text()"):null},this.buildForest(this.xpath.nodeIterator(e,"tei:*")))
for(let C=0;C<e.attributes.length;C++)H._attrs[e.attributes[C].name]=e.attributes[C].value
t[e.localName]?(Array.isArray(t[e.localName])||(t[e.localName]=[t[e.localName]]),t[e.localName].push(H)):t[e.localName]=H,e=C.iterateNext()}return t}get metadata(){return this._metadata||(this._metadata=this.buildForest(this.xpath.nodeIterator(this.dom.documentElement,"/tei:TEI/tei:teiHeader/tei:*"))),this._metadata}}class JV{constructor(C){this.serializer=null,this.serializer=C}serialize(C,e,t,H){let i=['<?xml version="1.0" encoding="UTF-8"?>','<tei:TEI xmlns:tei="http://www.tei-c.org/ns/1.0">']
return(i=(i=i.concat(this.serializeMetadata(C))).concat(this.serializeText(e,t,H))).push("</tei:TEI>"),i.join("\n")+"\n"}serializeMetadata(C){let e=[]
function t(C,e,t){let H=["<",C.node]
return C.attrs&&Object.keys(C.attrs).forEach(t=>{H.push(" "),H.push(t),H.push('="'),H.push(eV([e,C.attrs[t]])),H.push('"')}),t&&H.push("/"),H.push(">"),H.join("")}return function C(H,i,V){H.multiple?eV([i,H.multiple]).forEach(i=>{H.children?(e.push(V+t(H,i,!1)),H.children.forEach(e=>{C(e,i,V+"  ")}),e.push(V+"</"+H.node+">")):H.text?e.push(V+t(H,i,!1)+eV([i,H.text])+"</"+H.node+">"):e.push(V+t(H,i,!0))}):H.children?(e.push(V+t(H,i,!1)),H.children.forEach(e=>{C(e,i,V+"  ")}),e.push(V+"</"+H.node+">")):H.text?e.push(V+t(H,i,!1)+eV([i,H.text])+"</"+H.node+">"):e.push(V+t(H,i,!0))}(this.serializer.metadata,C,"  "),e}serializeText(C,e,t){let H=["  <tei:text>"]
return(H=(H=(H=H.concat(this.serializeTextElement(C,this.serializer.mainText,"    "))).concat(this.serializeTextElement(e,this.serializer.globalAnnotations,"    "))).concat(this.serializeTextElement({type:"_collection",content:t},this.serializer.individualAnnotations,"    "))).push("  </tei:text>"),H}serializeTextAttributes(C){let e=[],t=Object.keys(C)
return t.sort(),t.forEach(t=>{e.push(" "),e.push(t),e.push('="')
let H=C[t].split(" ")
H.sort(),e.push(H.join(" ")),e.push('"')}),e}serializeBlockTextElement(C,e,t){let H=e[C.type],i=[t,"<",H.node]
if(H.attrs){let e=C.attrs,t=H.attrs,V={}
t.forEach(C=>{C.selector?e&&e[C.selector]&&(C.values&&C.values[e[C.selector]]?V[C.name]?V[C.name]=V[C.name]+" "+C.values[e[C.selector]]:V[C.name]=C.values[e[C.selector]]:C.value&&e[C.selector]&&(V[C.name]?V[C.name]=V[C.name]+" "+C.value.replace("${value}",e[C.selector]):V[C.name]=C.value.replace("${value}",e[C.selector]))):V[C.name]?V[C.name]=V[C.name]+" "+C.value:V[C.name]=C.value}),i=i.concat(this.serializeTextAttributes(V))}i.push(">")
let V=[i.join("")]
return C.content&&C.content.forEach(C=>{V=V.concat(this.serializeTextElement(C,e,t+"  "))}),V.push(t+"</"+H.node+">"),V}serializeInlineTextElement(C,e,t){let H=void 0,i={},V=void 0
C.marks&&C.marks.forEach(t=>{if(e.marks[t.type]){if(void 0===H&&(H=e.marks[t.type].node),e.marks[t.type].attrs){e.marks[t.type].attrs.forEach(e=>{e.selector?"text()"===e.selector?i[e.name]?i[e.name]=i[e.name]+" "+C.text:i[e.name]=C.text:t.attrs&&(e.values&&t.attrs[e.selector]&&e.values[t.attrs[e.selector]]?i[e.name]?i[e.name]=i[e.name]+" "+e.values[t.attrs[e.selector]]:i[e.name]=e.values[t.attrs[e.selector]]:e.value&&t.attrs[e.selector]&&(i[e.name]?i[e.name]=i[e.name]+" "+e.value.replace("${value}",t.attrs[e.selector]):i[e.name]=e.value.replace("${value}",t.attrs[e.selector]))):i[e.name]?i[e.name]=i[e.name]+" "+e.value:i[e.name]=e.value})}void 0!==e.marks[t.type].text&&(V=e.marks[t.type].text)}}),void 0===H&&(H=e.node),void 0===V&&(V=C.text)
let n=[t,"<",H]
return n=n.concat(this.serializeTextAttributes(i)),null!=V?(n.push(">"),n.push(V),n.push("</"+H+">")):n.push("/>"),[n.join("")]}serializeTextElement(C,e,t){let H=[]
return Object.keys(e).forEach(i=>{if(C.type===i){let V=e[i]
H=V.inline?H.concat(this.serializeInlineTextElement(C,V,t)):H.concat(this.serializeBlockTextElement(C,e,t))}}),H}}var YV=function(C,e,t,H){var i,V=arguments.length,n=V<3?e:null===H?H=Object.getOwnPropertyDescriptor(e,t):H
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(C,e,t,H)
else for(var r=C.length-1;r>=0;r--)(i=C[r])&&(n=(V<3?i(n):V>3?i(e,t,n):i(e,t))||n)
return V>3&&n&&Object.defineProperty(e,t,n),n}
class XV extends K{constructor(){super(...arguments),this.currentView="#tei-editor-main-text",this.loaded=!1,this.mainText=null,this.displayedMainText=null,this.globalAnnotationText=null,this.displayedGlobalAnnotationText=null,this.metadata=null,this.individualAnnotations=null}get mainTextEditorConfig(){return window.teiEditorConfig.schema.mainText}get mainTextSidebarConfig(){return window.teiEditorConfig.ui.mainText.sidebar}get globalAnnotationConfig(){return window.teiEditorConfig.schema.globalAnnotations}get globalAnnotationSidebarConfig(){return window.teiEditorConfig.ui.globalAnnotations.sidebar}get individualAnnotationsConfig(){return window.teiEditorConfig.schema.individualAnnotations}get individualAnnotationsSidebarConfig(){return window.teiEditorConfig.ui.individualAnnotations.sidebar}get metadataConfig(){return window.teiEditorConfig.ui.metadata}get individualAnnotationsDefault(){return window.teiEditorConfig.default.individualAnnotations}loadFile(C){C.preventDefault()
let e=this,t=document.createElement("input")
t.setAttribute("type","file"),t.setAttribute("class","hidden"),document.querySelector("body").appendChild(t),t.click(),t.addEventListener("change",function(C){let H=C.target.files
if(H.length>0){let C=new FileReader
C.onload=(C=>{let t=new KV(C.target.result,window.teiEditorConfig.parser)
e.mainText=t.body,e.displayedMainText=t.body,e.metadata=t.metadata,e.globalAnnotationText=t.globalAnnotationText,e.displayedGlobalAnnotationText=t.globalAnnotationText,e.individualAnnotations=t.individualAnnotations,e.loaded=!0}),C.readAsText(H[0])}t.remove()})}saveFile(C){C.preventDefault()
let e=new JV(window.teiEditorConfig.serializer).serialize(this.metadata,this.mainText,this.globalAnnotationText,this.individualAnnotations),t=new Blob([e],{type:"text/xml;charset=utf-8"}),H=document.createElement("a")
H.setAttribute("href",URL.createObjectURL(t)),H.setAttribute("download","download.tei"),document.body.appendChild(H),H.click(),document.body.removeChild(H)}setView(C,e){e.preventDefault(),document.querySelector(this.currentView).setAttribute("aria-hidden","true"),this.currentView=C,document.querySelector(this.currentView).setAttribute("aria-hidden","false")}updateMainText(C){this.mainText=C}updateGlobalAnnotationText(C){this.globalAnnotationText=C}updateMetadata(C){this.metadata=C}updateIndividualAnnotations(C){this.individualAnnotations=C}}YV([R],XV.prototype,"currentView",void 0),YV([R],XV.prototype,"loaded",void 0),YV([R],XV.prototype,"mainText",void 0),YV([R],XV.prototype,"displayedMainText",void 0),YV([R],XV.prototype,"globalAnnotationText",void 0),YV([R],XV.prototype,"displayedGlobalAnnotationText",void 0),YV([R],XV.prototype,"metadata",void 0),YV([R],XV.prototype,"individualAnnotations",void 0)
var QV={"component:/tei-editor/components/AriaDropdownMenu":$i,"template:/tei-editor/components/AriaDropdownMenu":{id:"jlrELQXU",block:'{"symbols":["@title","&default"],"statements":[[6,"li"],[10,"role","presentation"],[10,"class","dropdown"],[11,"onmouseover",[26,"action",[[22,["mouseOver"]]],null],null],[11,"onmouseout",[26,"action",[[22,["mouseOut"]]],null],null],[8],[0,"\\n  "],[6,"a"],[10,"role","menuitem"],[10,"aria-haspopup","true"],[10,"tabindex","-1"],[11,"aria-expanded",[20,"expanded"],null],[11,"onclick",[26,"action",[[22,["click"]]],null],null],[11,"onkeydown",[26,"action",[[22,["keyDown"]]],null],null],[8],[1,[21,1,[]],false],[9],[0,"\\n  "],[6,"ul"],[10,"role","menu"],[10,"class","vertical"],[11,"onkeydown",[26,"action",[[22,["keyDown"]]],null],null],[8],[0,"\\n    "],[13,2],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/tei-editor/components/AriaDropdownMenu"}},"component:/tei-editor/components/AriaMenu":class extends K{keyDown(C){if(39===C.keyCode){let e=C.target.parentElement.nextElementSibling
for(;e&&("separator"===e.getAttribute("role")||"true"===e.querySelector('*[role="menuitem"]').getAttribute("aria-disabled"));)e=e.nextElementSibling
e&&e.querySelector('*[role="menuitem"]').focus()}else if(37===C.keyCode){let e=C.target.parentElement.previousElementSibling
for(;e&&("separator"===e.getAttribute("role")||"true"===e.querySelector('*[role="menuitem"]').getAttribute("aria-disabled"));)e=e.previousElementSibling
e&&e.querySelector('*[role="menuitem"]').focus()}}},"template:/tei-editor/components/AriaMenu":{id:"IoCg9v0u",block:'{"symbols":["@class","@label","&default"],"statements":[[6,"nav"],[10,"role","menubar"],[11,"class",[21,1,[]],null],[11,"arial-label",[21,2,[]],null],[8],[0,"\\n  "],[6,"ul"],[10,"role","menu"],[11,"onkeydown",[26,"action",[[22,["keyDown"]]],null],null],[8],[0,"\\n    "],[13,3],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/tei-editor/components/AriaMenu"}},"component:/tei-editor/components/AriaMenuAction":qi,"template:/tei-editor/components/AriaMenuAction":{id:"E5+xlPLz",block:'{"symbols":["@action","@label","@current","@hidden","&default","@disabled"],"statements":[[6,"li"],[10,"role","presentation"],[8],[4,"if",[[21,6,[]]],null,{"statements":[[6,"a"],[10,"role","menuitem"],[11,"onclick",[26,"action",[[22,["noAction"]]],null],null],[11,"tabindex",[20,"tabindex"],null],[11,"title",[21,2,[]],null],[11,"aria-label",[21,2,[]],null],[10,"aria-disabled","true"],[11,"aria-current",[21,3,[]],null],[11,"aria-hidden",[21,4,[]],null],[8],[13,5],[9]],"parameters":[]},{"statements":[[6,"a"],[10,"role","menuitem"],[11,"onclick",[21,1,[]],null],[11,"tabindex",[20,"tabindex"],null],[11,"title",[21,2,[]],null],[11,"aria-label",[21,2,[]],null],[10,"aria-disabled","false"],[11,"aria-current",[21,3,[]],null],[11,"aria-hidden",[21,4,[]],null],[8],[13,5],[9]],"parameters":[]}],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/tei-editor/components/AriaMenuAction"}},"component:/tei-editor/components/IndividualAnnotationEditor":Yi,"template:/tei-editor/components/IndividualAnnotationEditor":{id:"g7zCna++",block:'{"symbols":["annotation","@schema","@sidebar"],"statements":[[6,"nav"],[10,"class","tei-editor-menubar"],[8],[0,"\\n  "],[5,"AriaMenu",[],[["@label"],["Individual Annotation"]],{"statements":[[0,"\\n    "],[6,"li"],[10,"role","presentation"],[8],[0,"\\n      "],[6,"select"],[10,"role","menuitem"],[10,"tabindex","0"],[10,"aria-label","Select the annotation to edit"],[11,"onchange",[26,"action",[[22,["selectAnnotation"]]],null],null],[8],[0,"\\n"],[4,"each",[[22,["annotations"]]],[["key"],["@index"]],{"statements":[[4,"if",[[26,"eq",[[21,1,["attrs","id"]],[22,["selectedId"]]],null]],null,{"statements":[[0,"            "],[6,"option"],[11,"value",[21,1,["attrs","id"]],null],[10,"selected","selected"],[8],[1,[21,1,["attrs","id"]],false],[9],[0,"\\n"]],"parameters":[]},{"statements":[[0,"            "],[6,"option"],[11,"value",[21,1,["attrs","id"]],null],[8],[1,[21,1,["attrs","id"]],false],[9],[0,"\\n"]],"parameters":[]}]],"parameters":[1]},null],[0,"      "],[9],[0,"\\n    "],[9],[0,"\\n    "],[5,"AriaMenuAction",[],[["@label","@disabled","@action"],["Delete this annotation",[26,"eq",[[26,"get",[[22,["annotations"]],"length"],null],0],null],[26,"action",[[22,["deleteAnnotation"]]],null]]],{"statements":[[5,"MdiIcon",[],[["@name"],["Delete"]],{"statements":[],"parameters":[]}]],"parameters":[]}],[0,"\\n    "],[5,"AriaMenuAction",[],[["@label","@action"],["Add an annotation",[26,"action",[[22,["addAnnotation"]]],null]]],{"statements":[[5,"MdiIcon",[],[["@name"],["Plus"]],{"statements":[],"parameters":[]}]],"parameters":[]}],[0,"\\n  "]],"parameters":[]}],[0,"\\n"],[9],[0,"\\n"],[6,"div"],[8],[0,"\\n  "],[5,"ProsemirrorEditor",[],[["@schema","@sidebar","@text","@update"],[[21,2,[]],[21,3,[]],[20,"bodyText"],[26,"action",[[22,["updateAnnotationText"]]],null]]],{"statements":[],"parameters":[]}],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/tei-editor/components/IndividualAnnotationEditor"}},"component:/tei-editor/components/MdiIcon":CV,"template:/tei-editor/components/MdiIcon":{id:"+vasYLfA",block:'{"symbols":["@label"],"statements":[[6,"svg"],[10,"viewBox","0 0 24 24"],[11,"class",[20,"class"],null],[11,"aria-label",[21,1,[]],null],[8],[6,"path"],[11,"d",[20,"icon"],null],[8],[9],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/tei-editor/components/MdiIcon"}},"component:/tei-editor/components/MetadataEditor":class extends K{setMetadataField(C,e){e.preventDefault()
let t=Ki([this.args.metadata])
t=tV([t,C,e.target.value]),this.args.update(t)}addMultiFieldRow(C,e,t){t.preventDefault()
let H=Ki([this.args.metadata]),i=eV([H,C]),V=[]
e.forEach(C=>{let e={}
e=tV([e,C.value_key,""]),V.push(e)}),i.push(V),console.log(this.args.update),this.args.update(H)}removeMultiFieldRow(C,e,t){t.preventDefault()
let H=Ki([this.args.metadata])
eV([H,C]).splice(e,1),this.args.update(H)}moveMultiFieldRowUp(C,e,t){t.preventDefault()
let H=Ki([this.args.metadata]),i=eV([H,C]),V=i[e]
i.splice(e,1),i.splice(e-1,0,V),this.args.update(H)}moveMultiFieldRowDown(C,e,t){t.preventDefault()
let H=Ki([this.args.metadata]),i=eV([H,C]),V=i[e]
i.splice(e,1),i.splice(e+1,0,V),this.args.update(H)}},"template:/tei-editor/components/MetadataEditor":{id:"HB/ThmSt",block:'{"symbols":["section","entry","value","value_idx","part_entry","part_idx","@metadata","@config"],"statements":[[6,"dl"],[8],[0,"\\n"],[4,"each",[[21,8,[]]],[["key"],["@index"]],{"statements":[[0,"    "],[6,"dt"],[8],[1,[21,1,["title"]],false],[9],[0,"\\n    "],[6,"dd"],[8],[0,"\\n      "],[6,"ul"],[8],[0,"\\n"],[4,"each",[[21,1,["entries"]]],[["key"],["@index"]],{"statements":[[4,"if",[[26,"eq",[[21,2,["type"]],"single-text"],null]],null,{"statements":[[0,"            "],[6,"li"],[10,"class","tei-editor-metadata-single"],[8],[6,"label"],[8],[1,[21,2,["label"]],false],[6,"input"],[10,"type","text"],[11,"value",[26,"get",[[21,7,[]],[21,2,["value_key"]]],null],null],[11,"onchange",[26,"action",[[22,["setMetadataField"]],[21,2,["value_key"]]],null],null],[8],[9],[9],[9],[0,"\\n"]],"parameters":[]},null],[4,"if",[[26,"eq",[[21,2,["type"]],"multi-field"],null]],null,{"statements":[[0,"            "],[6,"li"],[10,"class","tei-editor-metadata-multiple"],[8],[0,"\\n"],[4,"each",[[26,"get",[[21,7,[]],[21,2,["value_key"]]],null]],[["key"],["@index"]],{"statements":[[0,"              "],[6,"div"],[8],[0,"\\n"],[4,"each",[[21,2,["entries"]]],[["key"],["@index"]],{"statements":[[0,"                  "],[6,"div"],[8],[6,"label"],[8],[1,[21,5,["label"]],false],[6,"input"],[10,"type","text"],[11,"value",[26,"get",[[21,3,[]],[21,5,["value_key"]]],null],null],[11,"onchange",[26,"action",[[22,["setMetadataField"]],[26,"join",[".",[21,2,["value_key"]],[21,4,[]],[21,5,["value_key"]]],null]],null],null],[8],[9],[9],[9],[0,"\\n"]],"parameters":[5,6]},null],[0,"                "],[6,"nav"],[8],[0,"\\n                  "],[5,"AriaMenu",[],[[],[]],{"statements":[[0,"\\n                    "],[5,"AriaMenuAction",[],[["@tabindex","@label","@action"],["0","Delete this row",[26,"action",[[22,["removeMultiFieldRow"]],[21,2,["value_key"]],[21,4,[]]],null]]],{"statements":[[5,"MdiIcon",[],[["@name"],["Delete"]],{"statements":[],"parameters":[]}]],"parameters":[]}],[0,"\\n                    "],[5,"AriaMenuAction",[],[["@tabindex","@label","@disabled","@action"],["-1","Move this row up one",[26,"array-first",[[26,"get",[[21,7,[]],[21,2,["value_key"]]],null],[21,4,[]]],null],[26,"action",[[22,["moveMultiFieldRowUp"]],[21,2,["value_key"]],[21,4,[]]],null]]],{"statements":[[5,"MdiIcon",[],[["@name"],["ArrowUp"]],{"statements":[],"parameters":[]}]],"parameters":[]}],[0,"\\n                    "],[5,"AriaMenuAction",[],[["@tabindex","@label","@disabled","@action"],["-1","Move this row one down",[26,"array-last",[[26,"get",[[21,7,[]],[21,2,["value_key"]]],null],[21,4,[]]],null],[26,"action",[[22,["moveMultiFieldRowDown"]],[21,2,["value_key"]],[21,4,[]]],null]]],{"statements":[[5,"MdiIcon",[],[["@name"],["ArrowDown"]],{"statements":[],"parameters":[]}]],"parameters":[]}],[0,"\\n                  "]],"parameters":[]}],[0,"\\n                "],[9],[0,"\\n              "],[9],[0,"\\n"]],"parameters":[3,4]},null],[0,"              "],[5,"AriaMenu",[],[[],[]],{"statements":[[0,"\\n                "],[5,"AriaMenuAction",[],[["@tabindex","@label","@action"],["0","Add a new row",[26,"action",[[22,["addMultiFieldRow"]],[21,2,["value_key"]],[21,2,["entries"]]],null]]],{"statements":[[5,"MdiIcon",[],[["@name"],["Plus"]],{"statements":[],"parameters":[]}]],"parameters":[]}],[0,"\\n              "]],"parameters":[]}],[0,"\\n            "],[9],[0,"\\n"]],"parameters":[]},null]],"parameters":[2]},null],[0,"      "],[9],[0,"\\n    "],[9],[0,"\\n"]],"parameters":[1]},null],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/tei-editor/components/MetadataEditor"}},"component:/tei-editor/components/ProsemirrorEditor":GV,"component:/tei-editor/components/ProsemirrorEditor/set-doc-attr":WV,"template:/tei-editor/components/ProsemirrorEditor":{id:"YPC3SuuR",block:'{"symbols":["section","entry","index","value","value","@annotations","@sidebar"],"statements":[[6,"div"],[8],[0,"\\n  "],[6,"div"],[10,"class","tei-editor-prosemirror-editor"],[8],[0,"\\n    "],[6,"div"],[11,"id",[20,"prosemirrorId"],null],[8],[9],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"],[6,"div"],[8],[0,"\\n  "],[6,"div"],[10,"class","tei-editor-prosemirror-sidebar"],[8],[0,"\\n    "],[6,"dl"],[8],[0,"\\n"],[4,"each",[[21,7,[]]],[["key"],["@index"]],{"statements":[[4,"if",[[26,"status-display-entry",[[22,["status"]],[21,1,["test"]]],null]],null,{"statements":[[0,"          "],[6,"dt"],[8],[1,[21,1,["title"]],false],[9],[0,"\\n          "],[6,"dd"],[8],[0,"\\n            "],[5,"AriaMenu",[],[["@label"],["Main"]],{"statements":[[0,"\\n"],[4,"each",[[21,1,["entries"]]],[["key"],["@index"]],{"statements":[[4,"if",[[26,"eq",[[21,2,["type"]],"select"],null]],null,{"statements":[[0,"                  "],[6,"li"],[10,"class","input"],[8],[0,"\\n                    "],[6,"select"],[10,"role","menuitem"],[11,"tabindex",[26,"aria-menu-item-tabindex",[[21,3,[]]],null],null],[11,"onchange",[26,"action",[[22,["menuAction"]],[21,2,["action"]],[21,2,["attribute"]],"ev.target.value"],null],null],[8],[0,"\\n"],[4,"each",[[21,2,["values"]]],[["key"],["@index"]],{"statements":[[0,"                        "],[6,"option"],[11,"value",[21,5,["key"]],null],[11,"selected",[26,"eq",[[26,"get",[[22,["status"]],[21,2,["value_key"]]],null],[21,5,["key"]]],null],null],[8],[1,[21,5,["value"]],false],[9],[0,"\\n"]],"parameters":[5]},null],[0,"                    "],[9],[0,"\\n                  "],[9],[0,"\\n"]],"parameters":[]},null],[4,"if",[[26,"eq",[[21,2,["type"]],"select-annotation"],null]],null,{"statements":[[0,"                  "],[6,"li"],[10,"class","input"],[8],[0,"\\n                    "],[6,"select"],[10,"role","menuitem"],[11,"tabindex",[26,"aria-menu-item-tabindex",[[21,3,[]]],null],null],[11,"onchange",[26,"action",[[22,["menuAction"]],[21,2,["action"]],[21,2,["attribute"]],"ev.target.value"],null],null],[8],[0,"\\n                      "],[6,"option"],[10,"value",""],[8],[0,"--- Please select ---"],[9],[0,"\\n"],[4,"each",[[21,6,[]]],[["key"],["@index"]],{"statements":[[0,"                        "],[6,"option"],[11,"value",[21,4,["attrs","id"]],null],[11,"selected",[26,"eq",[[26,"get",[[22,["status"]],[21,2,["value_key"]]],null],[21,4,["attrs","id"]]],null],null],[8],[1,[21,4,["attrs","id"]],false],[9],[0,"\\n"]],"parameters":[4]},null],[0,"                    "],[9],[0,"\\n                  "],[9],[0,"\\n"]],"parameters":[]},null],[4,"if",[[26,"eq",[[21,2,["type"]],"button"],null]],null,{"statements":[[4,"if",[[26,"eq",[[21,2,["value"]],"toggle"],null]],null,{"statements":[[0,"                    "],[5,"AriaMenuAction",[],[["@tabindex","@label","@action","@current"],[[26,"aria-menu-item-tabindex",[[21,3,[]]],null],[21,2,["label"]],[26,"action",[[22,["menuAction"]],[21,2,["action"]],[21,2,["attribute"]],[21,2,["value"]]],null],[26,"boolean-str",[[26,"get",[[22,["status"]],[21,2,["value_key"]]],null]],null]]],{"statements":[[5,"MdiIcon",[],[["@name"],[[21,2,["icon"]]]],{"statements":[],"parameters":[]}]],"parameters":[]}],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                    "],[5,"AriaMenuAction",[],[["@tabindex","@label","@action","@current"],[[26,"aria-menu-item-tabindex",[[21,3,[]]],null],[21,2,["label"]],[26,"action",[[22,["menuAction"]],[21,2,["action"]],[21,2,["attribute"]],[21,2,["value"]]],null],[26,"boolean-str",[[26,"eq",[[26,"get",[[22,["status"]],[21,2,["value_key"]]],null],[21,2,["value"]]],null]],null]]],{"statements":[[5,"MdiIcon",[],[["@name"],[[21,2,["icon"]]]],{"statements":[],"parameters":[]}]],"parameters":[]}],[0,"\\n"]],"parameters":[]}]],"parameters":[]},null],[4,"if",[[26,"eq",[[21,2,["type"]],"text"],null]],null,{"statements":[[0,"                  "],[6,"input"],[10,"type","text"],[11,"value",[26,"get",[[22,["status"]],[21,2,["value_key"]]],null],null],[11,"onchange",[26,"action",[[22,["menuAction"]],[21,2,["action"]],[21,2,["attribute"]],"ev.target.value"],null],null],[8],[9],[0,"\\n"]],"parameters":[]},null]],"parameters":[2,3]},null],[0,"            "]],"parameters":[]}],[0,"\\n          "],[9],[0,"\\n"]],"parameters":[]},null]],"parameters":[1]},null],[0,"    "],[9],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/tei-editor/components/ProsemirrorEditor"}},"component:/tei-editor/components/TeiEditor":XV,"component:/tei-editor/components/TeiEditor/tei":null,"template:/tei-editor/components/TeiEditor":{id:"SDrFQPne",block:'{"symbols":[],"statements":[[6,"div"],[10,"class","tei-editor"],[8],[0,"\\n  "],[6,"div"],[8],[0,"\\n    "],[5,"AriaMenu",[],[["@class"],["tei-editor-menubar"]],{"statements":[[0,"\\n      "],[5,"AriaMenuAction",[],[["@tabindex","@label"],["0","Undo"]],{"statements":[[5,"MdiIcon",[],[["@name"],["Undo"]],{"statements":[],"parameters":[]}]],"parameters":[]}],[0,"\\n      "],[5,"AriaMenuAction",[],[["@label"],["Redo"]],{"statements":[[5,"MdiIcon",[],[["@name"],["Redo"]],{"statements":[],"parameters":[]}]],"parameters":[]}],[0,"\\n      "],[5,"AriaDropdownMenu",[],[["@title"],["File"]],{"statements":[[0,"\\n        "],[5,"AriaMenuAction",[],[["@action"],[[26,"action",[[22,["loadFile"]]],null]]],{"statements":[[0,"Load"]],"parameters":[]}],[0,"\\n        "],[5,"AriaMenuAction",[],[["@action"],[[26,"action",[[22,["saveFile"]]],null]]],{"statements":[[0,"Save"]],"parameters":[]}],[0,"\\n      "]],"parameters":[]}],[0,"\\n      "],[5,"AriaMenuAction",[],[["@current","@hidden","@action"],[[26,"boolean-str",[[26,"eq",[[22,["currentView"]],"#tei-editor-main-text"],null]],null],[26,"boolean-str",[[26,"not",[[22,["loaded"]]],null]],null],[26,"action",[[22,["setView"]],"#tei-editor-main-text"],null]]],{"statements":[[0,"Text"]],"parameters":[]}],[0,"\\n      "],[5,"AriaMenuAction",[],[["@current","@hidden","@action"],[[26,"boolean-str",[[26,"eq",[[22,["currentView"]],"#tei-editor-global-annotations"],null]],null],[26,"boolean-str",[[26,"not",[[22,["loaded"]]],null]],null],[26,"action",[[22,["setView"]],"#tei-editor-global-annotations"],null]]],{"statements":[[0,"Global Annotations"]],"parameters":[]}],[0,"\\n      "],[5,"AriaMenuAction",[],[["@current","@hidden","@action"],[[26,"boolean-str",[[26,"eq",[[22,["currentView"]],"#tei-editor-individual-annotations"],null]],null],[26,"boolean-str",[[26,"not",[[22,["loaded"]]],null]],null],[26,"action",[[22,["setView"]],"#tei-editor-individual-annotations"],null]]],{"statements":[[0,"Individual Annotations"]],"parameters":[]}],[0,"\\n      "],[5,"AriaMenuAction",[],[["@current","@hidden","@action"],[[26,"boolean-str",[[26,"eq",[[22,["currentView"]],"#tei-editor-metadata"],null]],null],[26,"boolean-str",[[26,"not",[[22,["loaded"]]],null]],null],[26,"action",[[22,["setView"]],"#tei-editor-metadata"],null]]],{"statements":[[0,"Metadata"]],"parameters":[]}],[0,"\\n    "]],"parameters":[]}],[0,"\\n  "],[9],[0,"\\n  "],[6,"div"],[11,"aria-hidden",[26,"boolean-str",[[26,"not",[[22,["loaded"]]],null]],null],null],[8],[0,"\\n    "],[6,"div"],[10,"id","tei-editor-main-text"],[10,"aria-hidden","false"],[8],[0,"\\n      "],[5,"ProsemirrorEditor",[],[["@schema","@sidebar","@text","@annotations","@update"],[[20,"mainTextEditorConfig"],[20,"mainTextSidebarConfig"],[20,"displayedMainText"],[20,"individualAnnotations"],[26,"action",[[22,["updateMainText"]]],null]]],{"statements":[],"parameters":[]}],[0,"\\n    "],[9],[0,"\\n    "],[6,"div"],[10,"id","tei-editor-global-annotations"],[10,"aria-hidden","true"],[8],[0,"\\n      "],[5,"ProsemirrorEditor",[],[["@schema","@sidebar","@text","@update"],[[20,"globalAnnotationConfig"],[20,"globalAnnotationSidebarConfig"],[20,"displayedGlobalAnnotationText"],[26,"action",[[22,["updateGlobalAnnotationText"]]],null]]],{"statements":[],"parameters":[]}],[0,"\\n    "],[9],[0,"\\n    "],[6,"div"],[10,"id","tei-editor-individual-annotations"],[10,"aria-hidden","true"],[8],[0,"\\n      "],[5,"IndividualAnnotationEditor",[],[["@schema","@sidebar","@annotations","@default","@update"],[[20,"individualAnnotationsConfig"],[20,"individualAnnotationsSidebarConfig"],[20,"individualAnnotations"],[20,"individualAnnotationsDefault"],[26,"action",[[22,["updateIndividualAnnotations"]]],null]]],{"statements":[],"parameters":[]}],[0,"\\n    "],[9],[0,"\\n    "],[6,"div"],[10,"id","tei-editor-metadata"],[10,"aria-hidden","true"],[8],[0,"\\n      "],[5,"MetadataEditor",[],[["@config","@metadata","@update"],[[20,"metadataConfig"],[20,"metadata"],[26,"action",[[22,["updateMetadata"]]],null]]],{"statements":[],"parameters":[]}],[0,"\\n    "],[9],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/tei-editor/components/TeiEditor"}},"helper:/tei-editor/components/aria-menu-item-tabindex":function(C){return 0===C[0]?0:-1},"helper:/tei-editor/components/array-first":function(C){return C[0].length>0&&0===C[1]},"helper:/tei-editor/components/array-last":function(C){return C[1]===C[0].length-1},"helper:/tei-editor/components/boolean-str":function(C){return C[0]?"true":"false"},"helper:/tei-editor/components/deepclone":Ki,"helper:/tei-editor/components/eq":function(C){return C[0]===C[1]},"helper:/tei-editor/components/get":eV,"helper:/tei-editor/components/join":function(C){return C.slice(1).join(C[0])},"helper:/tei-editor/components/not":function(C){return!C[0]},"helper:/tei-editor/components/set":tV,"helper:/tei-editor/components/status-display-entry":function(C){let e=C[0],t=C[1]
if(e&&t){if("string"==typeof t)return eV([e,t])
if(t.key&&t.value)return eV([e,t.key])===t.value}else if(e&&!t)return!0
return!1}},Cn={app:{name:"tei-editor",rootName:"tei-editor"},types:{application:{definitiveCollection:"main"},component:{definitiveCollection:"components"},"component-test":{unresolvable:!0},helper:{definitiveCollection:"components"},"helper-test":{unresolvable:!0},renderer:{definitiveCollection:"main"},template:{definitiveCollection:"components"}},collections:{main:{types:["application","renderer"]},components:{group:"ui",types:["component","component-test","template","helper","helper-test"],defaultType:"component",privateCollections:["utils"]},styles:{group:"ui",unresolvable:!0},utils:{unresolvable:!0}}}
const en=new class extends zH{constructor(){let C=new Gi(QV),e=new Ui(Cn,C)
const t=document.body
super({builder:new Fi({element:t,nextSibling:null}),loader:new Ri(e),renderer:new Ii,resolver:e,rootName:Cn.app.rootName})}},tn=document.getElementById("app")
G=(()=>{en.scheduleRerender()}),en.registerInitializer({initialize(C){C.register(`component-manager:/${en.rootName}/component-managers/main`,Ve)}}),en.renderComponent("TeiEditor",tn,null),en.boot(),function(C,e){for(let t in e)re(C,t,e[t])}(en,{"tei-editor":"TeiEditor"})})
(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{Uioh:function(l,n,u){"use strict";u.r(n);var e=u("8Y7J"),t=u("AytR");class r{constructor(l,n,u,e){this.route=l,this.shareService=n,this.homeService=u,this.documentService=e}ngOnInit(){const l=this.shareService.getUserId();this.route.paramMap.subscribe(l=>{this.tradeNumber=l.get("trade_num"),this.blNumber=l.get("bl_number")}),this.getDocuments({trade_num:this.tradeNumber,bt_num:this.blNumber,userId:l})}getDocuments(l){this.homeService.getAllDocument(l).subscribe(l=>{})}sendShipmentFileByEmail(l){const n={company_number:this.shareService.getCompany,file_name:l,mail_to:this.shareService.getUserEmail,platform:t.a.PLATFORM_ID,device_id:t.a.APP_ID,generated_by:this.shareService.getUserName};console.log(n),this.documentService.sendByMail(n)}}class a{}var o=u("pMnS"),i=u("iInd"),s=u("dz5x"),c=u("nr5L"),b=u("V9dR"),d=e.sb({encapsulation:2,styles:[[".dropdown-option .dropdown-toggle::after{display:none!important}.reports .box,.reports .table-responsive{overflow:hidden}"]],data:{}});function m(l){return e.Ob(0,[(l()(),e.ub(0,0,null,null,16,"div",[["class","d-flex"],["id","wrapper"]],null,null,null,null,null)),(l()(),e.ub(1,0,null,null,15,"div",[["id","page-content-wrapper"]],null,null,null,null,null)),(l()(),e.ub(2,0,null,null,14,"div",[["class","container"]],null,null,null,null,null)),(l()(),e.ub(3,0,null,null,13,"div",[["class","box"]],null,null,null,null,null)),(l()(),e.ub(4,0,null,null,1,"div",[["class","mb-3 font-weight-semibold"]],null,null,null,null,null)),(l()(),e.Mb(-1,null,["Document"])),(l()(),e.ub(6,0,null,null,10,"div",[["class","table-responsive document"]],null,null,null,null,null)),(l()(),e.ub(7,0,null,null,9,"table",[["class","table table-custom mb-0"],["id","example"]],null,null,null,null,null)),(l()(),e.ub(8,0,null,null,3,"thead",[],null,null,null,null,null)),(l()(),e.ub(9,0,null,null,2,"tr",[],null,null,null,null,null)),(l()(),e.ub(10,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e.Mb(-1,null,["File name"])),(l()(),e.ub(12,0,null,null,4,"tbody",[],null,null,null,null,null)),(l()(),e.ub(13,0,null,null,3,"tr",[["style","padding-bottom: 55px;"]],null,null,null,null,null)),(l()(),e.ub(14,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),e.ub(15,0,null,null,1,"a",[["class","linkdocument"]],null,null,null,null,null)),(l()(),e.Mb(-1,null,["No data found"]))],null,null)}function p(l){return e.Ob(0,[(l()(),e.ub(0,0,null,null,1,"app-document",[],null,null,null,m,d)),e.tb(1,114688,null,0,r,[i.a,s.a,c.a,b.a],null,null)],function(l,n){l(n,1,0)},null)}var h=e.qb("app-document",r,p,{},{},[]),g=u("SVse"),_=u("G0yt");u.d(n,"DocumentModuleNgFactory",function(){return v});var v=e.rb(a,[],function(l){return e.Bb([e.Cb(512,e.l,e.eb,[[8,[o.a,h]],[3,e.l],e.A]),e.Cb(4608,g.n,g.m,[e.x,[2,g.C]]),e.Cb(1073742336,g.b,g.b,[]),e.Cb(1073742336,_.z,_.z,[]),e.Cb(1073742336,i.o,i.o,[[2,i.t],[2,i.k]]),e.Cb(1073742336,a,a,[]),e.Cb(1024,i.i,function(){return[[{path:":trade_num/:bl_number",component:r}]]},[])])})},nr5L:function(l,n,u){"use strict";u.d(n,"a",function(){return i});var e=u("Do2H"),t=u("AytR"),r=u("8Y7J"),a=u("IheW"),o=u("EApP");const i=(()=>{class l extends e.a{getAllPurchase(l){return this.get(`${t.a.api}/getAllPurchaseBySearch?company_num=${l}`)}getPurchaseDetail(l){return this.get(`${t.a.api}/getPurchaseDetail?trade_num=${l}`)}getAllDocument(l){let n=`${t.a.api}/getFilesForShipment?`;return localStorage.getItem("USER_ID"),this.get(n,{trade_num:l.trade_num,bl_num:l.bt_num,platform:t.a.PLATFORM_ID,user_id:l.userId})}searchByKeyword(l){let n=`${t.a.api}/getAllPurchaseBySearch?`,u=localStorage.getItem("USER_ID");return this.get(n,{company_num:l.company_num,trade_num:l.trade_num,origin_num:l.origin_num,ref:l.ref,platform:t.a.PLATFORM_ID,user_id:u})}getLocation(l){return this.get(`${t.a.dropdownEndpoint}?counterpart=${l}`)}}return l.ngInjectableDef=r.Qb({factory:function(){return new l(r.Ub(a.c),r.Ub(o.j))},token:l,providedIn:"root"}),l})()}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"0HcA":function(e,a,t){"use strict";var l=t("fbTi"),n=t("mZ4U");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,t("hDi6");var i=n(t("vAq0"));t("xrIM");var r=n(t("dEB1"));t("vZHA");var d=n(t("AMvt"));t("1Lxf");var u=n(t("Ua38"));t("aMK7");var o=n(t("NgbC")),f=n(t("43Yg")),c=n(t("/tCh")),s=n(t("scpF")),m=n(t("O/V9")),p=n(t("8aBX")),g=l(t("i9FB")),y=t("LneV");t("1OjR");var h=t("eDcw"),v=n(t("cPMy")),b=n(t("9cJB")),E=t("c+yx"),I=function(e){function a(e){var t;return(0,f.default)(this,a),t=(0,s.default)(this,(0,m.default)(a).call(this,e)),t.columns=[{title:"\u8f66\u724c",dataIndex:"brands",key:"brands"},{title:"\u8f66\u578b",dataIndex:"plate",key:"plate"},{title:"\u8d2d\u8f66\u65f6\u95f4",dataIndex:"frameNumber",key:"frameNumber"},{title:"\u8d2d\u4e70\u91d1\u989d",dataIndex:"ownerName",key:"ownerName"}],t.formatNationality=function(e){var a=t.props.nationalityData,l="";return a.forEach(function(a){a.value===e&&(l=a.name)}),l},t.state={loading:!1,id:e.match.params.id,driverInfo:{},pageInfo:{pageSize:10,pageNum:1}},t}return(0,p.default)(a,e),(0,c.default)(a,[{key:"componentDidMount",value:function(){this.initData();var e=this.props,a=e.professionData,t=e.nationalityData,l=e.dispatch;a.length<=0&&l({type:"global/fetchProfession",payload:{pageNum:1,pageSize:100}}),t.length<=0&&l({type:"global/fetchNationality",payload:{pageNum:1,pageSize:100}})}},{key:"initData",value:function(){var e=this,a=this.props.dispatch,t=this.state.id,l=function(a){1===a.code&&e.setState({driverInfo:a.data})};a&&a({type:"carInfo/detailDriver",payload:{id:t},callback:l})}},{key:"render",value:function(){var e=this,a=this.props,t=a.data,l=a.loading,n=this.state.driverInfo;return g.default.createElement(h.PageHeaderWrapper,null,g.default.createElement(o.default,{title:"\u57fa\u672c\u4fe1\u606f"},g.default.createElement(u.default,null,g.default.createElement(d.default,{span:6},g.default.createElement("img",{src:b.default,className:"car-detail"})),g.default.createElement(d.default,{span:18},g.default.createElement(r.default,null,g.default.createElement(r.default.Item,{label:"\u7528\u6237\u59d3\u540d"},n.realName),g.default.createElement(r.default.Item,{label:"\u8054\u7cfb\u7535\u8bdd"},n.concatPhone),g.default.createElement(r.default.Item,{label:"\u6027\u522b"},(0,E.formatSex)(n.sex)),g.default.createElement(r.default.Item,{label:"\u6240\u5c5e\u884c\u4e1a"},n.industry),g.default.createElement(r.default.Item,{label:"\u540d\u65cf"},this.formatNationality(n.nationality)),g.default.createElement(r.default.Item,{label:"\u5e74\u9f84"},(0,E.getAge)(n.identificationNumber)),g.default.createElement(r.default.Item,{label:"\u8eab\u4efd\u8bc1\u53f7\u7801"},n.identificationNumber),g.default.createElement(r.default.Item,{label:"\u5c45\u4f4f\u5730\u5740"},n.residentialAddress),g.default.createElement(r.default.Item,{label:"\u5907\u6ce8"},n.remarks))))),g.default.createElement(o.default,{title:"\u540d\u4e0b\u8f66\u8f86",style:{marginTop:25}},g.default.createElement(v.default,{rowKey:"id",columns:this.columns,data:t||[],loading:l,onChangeCombine:function(a){return e.initData()}})),g.default.createElement(i.default,{size:"large",spinning:l,className:"spin"}))}}]),a}(g.Component),N=(0,y.connect)(function(e){var a=e.global,t=e.loading;return{professionData:a.professionData,nationalityData:a.nationalityData,loading:t.models.carInfo}})(I);a.default=N}}]);
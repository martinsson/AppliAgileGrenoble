cfunited.ui.Sponsors = Ext.extend(Ext.Panel,{
	fullscreen:true,
	styleHtmlContent:true,
	cls:'sponsors',
	
	initComponent: function(){

		this.btnBack = new Ext.Button({text:'Back',ui:'back',handler:this.onBack});
		
		this.titlebar = new Ext.Toolbar({
			title:'Sponsors',
			dock:'top',
			items:[this.btnBack]
		});
		
		Ext.regModel("Sponsor",{
			fields:[
				{name:'id',type:'int'},
				{name:'name',type:'string'},
				{name:'sponsors',type:'object',
					fields:[
						{name:'id',type:'int'},
						{name:'name',type:'string'},
						{name:'url',type:'string'},
						{name:'description',type:'string'}						
					]
				}				
			]
		});
		
		var tpl = [
			'<tpl for=".">',
				'<tpl for="sponsors">',
					'<div class="sponsor"><a href="{url}" target="_blank"> <img src="{logoimagepath}" width="100" border="0"/></a><br/>',
						'{description}',
					'</div>',
				'</tpl>',
			'</tpl>'
		];
		
		this.list = new Ext.List({
			id:'sponsors-list',
			fullscreen:true,
			tpl:tpl,
			singleSelect:true,
			itemSelector: 'div.sponsor',
			grouped:true,
			store: new Ext.data.Store({
				model:'Sponsor',
				getGroupString: function(record){
					return record.get('name');
				}
			})
		});		
		
		
		this.dockedItems = [this.titlebar];
		this.items = [this.list];
		
		cfunited.ui.Sponsors.superclass.initComponent.apply(this,arguments);
		
	},
	
	onBack: function(){
		Ext.getCmp('OptionsCard').setCard(0);
	},
	
   onLoad: function(){
        Ext.getBody().mask(false, '<div class="loading">Loading&hellip;</div>');
		var data = new Object();
		
		data = [
		{'id':1.0,'sponsors':[

	{'id':2.0,'url':'http:\/\/www.agilessence.fr','description':'','logoimagepath':'http:\/\/agile-grenoble.org\/_media\/2011\/agilessence.png','name':'Agilessence'},
	{'id':3.0,'url':'http:\/\/www.agiletoyou.com','description':'','logoimagepath':'http:\/\/agile-grenoble.org\/_media\/2011\/agiletoyou.png','name':'AgileToYou'},
	{'id':4.0,'url':'http:\/\/www.kelkoo.fr','description':'','logoimagepath':'http:\/\/agile-grenoble.org\/_media\/2011\/kelkoo.png','name':'kelkoo'},		
	{'id':5.0,'url':'http:\/\/agile-grenoble.org\/_media\/2011\/agile_presentation_moodys_s_analytics.pdf','description':'','logoimagepath':'http:\/\/agile-grenoble.org\/_media\/2011\/moodys.png','name':'Moody\'s'},
	{'id':6.0,'url':'http:\/\/www.objetdirect.com','description':'','logoimagepath':'http:\/\/agile-grenoble.org\/_media\/2011\/objetdirect.png','name':'Objet Direct'},
	{'id':7.0,'url':'http:\/\/www.groupe-open.com','description':'','logoimagepath':'http:\/\/agile-grenoble.org\/_media\/2011\/open.png','name':'Open'},
	{'id':8.0,'url':'http:\/\/www.osiatis.fr','description':'','logoimagepath':'http:\/\/agile-grenoble.org\/_media\/2011\/logo_osiatis_inge_fond_vert.jpg','name':'Osiatis'},
	{'id':9.0,'url':'http:\/\/www.persistent.fr','description':'','logoimagepath':'http:\/\/agile-grenoble.org\/_media\/2011\/persistent.jpg','name':'Persistent'},
	{'id':10.0,'url':'http:\/\/www.groupe-samse.fr','description':'','logoimagepath':'http:\/\/agile-grenoble.org\/_media\/2011\/samse.jpg','name':'SAMSE'},
	{'id':11.0,'url':'http:\/\/www.schneider-electric.com\/','description':'','logoimagepath':'http:\/\/agile-grenoble.org\/_media\/2011\/logo_schneider_small.png','name':'Schneider Electric'},	
	{'id':12.0,'url':'http:\/\/www.fr.sogeti.com','description':'','logoimagepath':'http:\/\/agile-grenoble.org\/_media\/2011\/sogeti.png','name':'Sogeti'},
	{'id':13.0,'url':'http:\//www.sogilis.com','description':'','logoimagepath':'http:\/\/agile-grenoble.org\/_media\/2011\/sogilis.png','name':'Sogilis'},
	{'id':14.0,'url':'http:\/\/www.sopragroup.com','description':'','logoimagepath':'http:\/\/agile-grenoble.org\/_media\/2011\/logo_sopra.jpg','name':'Sopra Group'},	
	{'id':15.0,'url':'http:\/\/www.ut7.fr','description':'','logoimagepath':'http:\/\/agile-grenoble.org\/_media\/2011\/ut7.PNG','name':'ut7'}			
	
		],'name':'Sponsors'}		
		];
		
			var sponsors = new Array();
				
				for(var i=0; i < data.length; i++){
					if(data[i].sponsors.length > 0){
						sponsors.push(data[i]);	
					}
				}
				
				Ext.getCmp('sponsors-list').getStore().loadData(sponsors);
				Ext.getBody().unmask();	
            
        			
	}
	
})
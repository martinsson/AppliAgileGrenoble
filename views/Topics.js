cfunited.ui.Topics = Ext.extend(Ext.Panel,{
	id:'topicsPanel',
	fullscreen:true,
	title:'Thèmes',
	iconCls:'bookmarks',
	layout:'card',
		
	initComponent: function(){
				
		this.topicsTitlebar = new Ext.Toolbar({
			title:'Thèmes',
			dock:'top'
		});	

		Ext.regModel("Topic",{
			fields: ['id','name','topics']
		});
				
		this.topics = new Ext.List({
			id:'topicsList',
			fullscreen:true,
			tpl:'<tpl for="."><div class="topic"><strong>{name}</strong></div></tpl>',
			singleSelect:true,
			itemSelector:'div.topic',
			dockedItems: [this.topicsTitlebar],
            store: new Ext.data.Store({
				model: 'Topic'
            })
		});			
		
		// SESSIONS CARD
		this.sessionsTitlebar = new Ext.Toolbar({
			title:'Sessions By Topic',
			dock:'top',
			items:[
				{xtype:'button',text:'Back',ui:'back',handler:this.onBack}
			]		
		});			
		
		Ext.regModel("Session",{
			fields: ['id','name','speakers']
		});
		
		var stpl = [
			'<tpl for=".">',
				'<div class="session">',
					'<strong>{name}</strong><br/>',
					'<tpl for="speakers">',
						'<span class="details">{name}</span>',
					'</tpl>',
				'</div>',
			'</tpl>'
		];
		
        this.sessions = new Ext.List({
			id:'sesByTopic',
			fullscreen:true,	
			tpl: stpl,
            itemSelector: 'div.session',
            singleSelect: true,
			dockedItems: [this.sessionsTitlebar],
            store: new Ext.data.Store({
                model: 'Session'
            })
        });
		
		this.sdetails = new cfunited.ui.TopicSessionDetails();
		this.items = [this.topics,this.sessions,this.sdetails];
		
		cfunited.ui.Topics.superclass.initComponent.apply(this,arguments);
		
		// events
		this.topics.on('itemtap',this.onTopicTap,this);
		this.sessions.on('itemtap',this.onSessionTap,this);
	},
	
	onBack: function(){
		Ext.getCmp('topicsPanel').setCard(0);
	},
	
	onSessionTap: function(view,index,item,e){
		var rec = view.store.getAt(index);
		this.setCard(2);			
		this.sdetails.loadSession(rec.data.id);
	},

	onTopicTap: function(view,index,item,e){
		var rec = view.store.getAt(index);
		this.setCard(1);
		
		// change the title bar
		this.sessionsTitlebar.setTitle(rec.data.name);
		
		// load the sessions for this topic
		this.sessions.getStore().loadData(rec.data.topics);		
	},
	
	onLoad: function(){
		Ext.getBody().mask(false, '<div class="loading">Loading&hellip;</div>');
		
		var topics_data = new Object();
		
		topics_data =		[		
				
		{'id':1,'topics':[{'id':1,'description':'...','name':'Keynote Claude Aubry','speakers':[{'id':1,'name':'Claude Aubry'}]}],'name':'Keynote'},		
		{'id':2,'topics':[{'id':2,'description':'','name':'Are Agile software-development philosophy and CMMI (Capability Maturity Model Integration) antithetical?','speakers':[{'id':2,'name':'Matthew Phillip'}]},{'id':3,'description':'','name':'Agile, dix ans après: ce qui a changé, ce qu\'il faut retenir','speakers':[{'id':3,'name':'Laurent Bossavit'}]}],'name':'Méthodologie'},
		{'id':3,'topics':[{'id':4,'description':'','name':'Offre agile pour survivre dans la jungle économique','speakers':[{'id':4,'name':'Jérôme Barrand'}]}],'name':'Management'},
		{'id':10,'topics':[
			{'id':50,'description':'....','name':'Accueil autour d\'un café','speakers':[{'id':50,'name':'CARA'}]},
			{'id':5,'description':'....','name':'Le mot des organisateurs','speakers':[{'id':50,'name':'CARA'}]}
			],'name':'Organisation'}
		];				
		
	 	Ext.getCmp('topicsList').getStore().loadData(topics_data);
		Ext.getBody().unmask();		
	}
	
});

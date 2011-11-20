cfunited.ui.TopicSessionDetails = Ext.extend(Ext.Panel,{
	fullscreen:true,
	styleHtmlContent:true,
	monitorOrientation:true,
	initComponent: function(){

		this.titlebar = new Ext.Toolbar({
			title:'Session Details',
			dock:'top',
			items:[
				{xtype:'button',text:'Back',ui:'back',handler:this.onBack}
			]
		});
		
		Ext.regModel("Session",{
			fields:[
				{name:'id',type:'int'},
				{name:'name',type:'string'},
				{name:'description',type:'string'},
				{name:'schedule',type:'object',
					fields:[
						{name:'date',type:'date',dateFormat:'m/d/Y'},
						{name:'starttime',type:'string'},
						{name:'endtime',type:'string'},
						{name:'location',type:'string'},
						{name:'seats',type:'int'}
					]
				},
				{name:'speakers',type:'object',
					fields:[
						{name:'id',type:'int'},
						{name:'name',type:'string'}
					]
				},
				{name:'location',type:'string'}
			]
		});
		
		this.tpl = [
			'<tpl for=".">',
				'<div class="session-detail">',			
					'<strong>What:</strong> {name}<br/>',
					'<strong>When:</strong>',
						'<tpl for="schedule">',
							'<tpl if="xindex == 1">',
							' {date} {starttime} - {endtime}<br/>',
							'</tpl>',
						'</tpl>',			
					'<strong>Who:</strong>',
						'<tpl for="speakers">',
							' {[xindex > 1 ? "," : ""]}{name}',
						'</tpl>',
					'<br/><strong>Where:</strong>',
						'<tpl for="schedule">',
							'<tpl if="xindex == 1">',
								' {location}<br/>',
							'</tpl>',
						'</tpl>',						
					'<br/>{description}<br/><br/>',
					'<tpl for="schedule">',
						'<tpl if="xindex == 2">',
							'<em>This session is repeated on Saturday from {starttime} to {endtime}</em>',
						'</tpl>',
					'</tpl>',
				'</div>',
			'</tpl>'
		];
		
		this.dv = new Ext.DataPanel({
			fullscreen:true,
			tpl:this.tpl,
            store: new Ext.data.Store({
				model: 'Session'
            })
		});
		
		this.dockedItems = [this.titlebar];
		this.items = [this.dv];
			
		cfunited.ui.TopicSessionDetails.superclass.initComponent.apply(this,arguments);
		
	},
	
	onBack: function(){		
		Ext.getCmp('topicsPanel').setCard(0);
	},
	
	loadSession: function(id){
		
		Ext.getBody().mask(false, '<div class="loading">Loading&hellip;</div>');
		
		var dv = this.dv;
			
			var session_data = new Object();
		
		session_data[50] =
		{'id':50,'schedule':[{'seats':450,'starttime':'08:00','endtime':'08:45','date':'','location':'Accueil'}],'description':'...','name':'Accueil autour d\'un café','speakers':[{'id':50,'name':'CARA'}]};

		session_data[1] =
		{'id':1,'schedule':[{'seats':450,'starttime':'9:00','endtime':'10:00','date':'','location':'Auditorium Pelvoux'}],'description':'...','name':'Keynote Claude Aubry','speakers':[{'id':1,'name':'Claude Aubry'}]};

		session_data[2] = 
		{'id':2,'schedule':[{'seats':450,'starttime':'10:00','endtime':'11:00','date':'','location':'Auditorium Pelvoux'}],'description':'Although Agile, with its focus on lightweight methods and delivering, and CMMI, a business-process improvement model with a reputation for heavyweight methods and useless documentation, seem at odds with each other, it is possible to do both -– and do them seamlessly. Given the fact that marrying agile and CMMI is not done very often throughout the industry, this presentation relates a real-life experience of fusing these two disciplines and what it means for software development and ultimately the beneficiary of that software. Agile practitioners and managers who are considering CMMI will learn some basic principles for successfully implementing CMMI in an agile organization in an agile way. ','name':'Are Agile software-development philosophy and CMMI (Capability Maturity Model Integration) antithetical? A story of successful methodology merger','speakers':[{'id':2,'name':'Matthew Philip'}]} ;
		
		session_data[3] =
		{'id':3,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'','location':'Belle-Etoile'}],'description':'Notre industrie du logiciel connaît une crise qui remonte quasiment à sa naissance; cette “crise du logiciel” a été le prétexte à fonder en 1968 une discipline désormais connue sous le nom de Génie Logiciel. Bien que cette discipline constitue le socle pédagogique de la formation, tout laisse penser que cette crise, loin d\'être résolue, ne peut qu\'aller en s\'aggravant. Apparues il y a dix ans, les approches Agiles sont-elles susceptibles d\'avoir un plus grand impact? Créditées de quelques succès, elles sont aussi très critiquées. Cet exposé accessible aux débutants comme aux agilistes confirmés, laissant une large part aux questions et réponses, offrira une occasion d\'aborder les questions de votre choix, sans aucun tabou ni faux-semblant. Les objectifs de cette présentation sont de mieux comprendre ce qu\'on entend par « Agile », et de repartir avec quelques pistes de pratiques nouvelles à essayer.','name':'Agile, dix ans après: ce qui a changé, ce qu\'il faut retenir','speakers':[{'id':3,'name':'Laurent Bossavit'}]} ;
		
		session_data[4] =
		{'id':4,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'','location':'Chartreuse'}],'description':'Mieux comprendre le monde économique dans ses nouvelles caractéristiques et mieux comprendre les nouvelles offres des entreprises pour mieux faire évoluer sa relation avec le client : prospective du contexte économique, caractéristiques de l’offre globale agile, définition de la nouvelle relation client-fournisseur, comportements adéquats. Les participants repartiront avec la conviction que l’agilité n’est pas qu’une mode et que sa portée va bien au-delà de la « programmation informatique ». Conférence d’ouverture des esprits.','name':'Offre agile pour survivre dans la jungle économique','speakers':[{'id':4,'name':'Jérôme Barrand'}]} ;			
		
        		dv.update(session_data[id]);
				Ext.getBody().unmask();	
            
           
        	
	
	}
	
});


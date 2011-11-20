cfunited.ui.Schedule = Ext.extend(Ext.Container,{
	id:'schedule-card',
	title:'Sessions',
	iconCls:'time',
	layout:'card',
	monitorOrientation:true,
	
	initComponent: function(){
	
		this.titlebar = new Ext.Toolbar({
			title:'Sessions',
			dock:'top'
		});	
	
		Ext.regModel("Schedule",{
			fields:[
				{name:'seats',type:'int'},
				{name:'starttime',type:'string'},
				{name:'endtime',type:'string'},
				{name:'topic',type:'object',
					fields: [
						{name:'id',type:'int'},
						{name:'name',type:'string'}
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
				
		this.sb = new Ext.SplitButton({
			defaults:{
				xtype:'button',
				scope:this,
				handler:function(btn,e){
					this.loadData(btn.id);
				}
			},
			centered:true,
			items:[
				{id:'AM',text:'Matin'},
				{id:'PM',text:'Après-midi'}				
			],
			cls:'day-selector'
		});
		
		var tpl = [
			'<tpl for=".">',
				'<div class="schedule">',
					'<tpl for="topic">',
						'<strong>{name}</strong><br/>',
					'</tpl>',
					'<div class="details">',
						'&nbsp;',
						'<tpl for="speakers">',
							'{[xindex > 1 ? ", " : ""]}{name}',
						'</tpl>',
						'<div class="location">{location}</div>',
					'</div>',
				'</div>',
			'</tpl>'
		];
		
        this.sessions = new Ext.List({
			id:'sessionList',
			cls:'session-list',
			fullscreen:true,
			tpl: tpl,
            itemSelector: 'div.schedule',
            singleSelect: true,
			grouped:true,
            store: new Ext.data.Store({
                model: 'Schedule',
                getGroupString: function(record){
					return record.get('starttime') + ' - ' + record.get('endtime');
                }
            })
        });	
		
		this.main = new Ext.Panel({
			dockedItems: [this.titlebar],
			items: [
				{
					xtype:'container',
					layout:'vbox',
					items:[
						this.sb,
						this.sessions
					]
				}
			]
		});
		
		this.sessionDetails = new cfunited.ui.SessionDetails();
		this.items = [this.main,this.sessionDetails];
		
		cfunited.ui.Schedule.superclass.initComponent.apply(this,arguments);
		
		// events
		this.sessions.on('itemtap',this.onItemTap,this);
	},
	
	onItemTap: function(view, index, item, e){		
		var rec = view.store.getAt(index);				
		this.setCard(1);		
	    this.sessionDetails.loadSession(rec.data.topic.id);			   
	},
	
	onBack: function(){
		this.setCard(0);
	},
	
	onLoad: function(){				
		this.loadData('AM');
		this.sb.setActive('AM');
	},
	
	loadData: function(salle){
	
	
        Ext.getBody().mask(false, '<div class="loading">Loading&hellip;</div>');		
		
		
		
		var schedule_data = new Object();
		
		schedule_data = [
		
		{'schedule': [{'seats':0,'starttime':'08:00','endtime':'08:45',
		'topic':{'id':50,'name':'Accueil autour d\'un café'},'speakers':[{'id':50,'name':'CARA'}],
		'location':'Accueil'}],
		'date':'AM'},		
		
		{'schedule': [{'seats':0,'starttime':'08:45','endtime':'09:00',
		'topic':{'id':5,'name':'Le Mot des organisateurs'},'speakers':[{'id':50,'name':'CARA'}],
		'location':'Auditorium Pelvoux'}],
		'date':'AM'},		
		
		
		{'schedule': [{'seats':450,'starttime':'09:00','endtime':'10:00',
		'topic':{'id':1,'name':'Keynote Claude Aubry'},'speakers':[{'id':1,'name':'Claude Aubry'}],
		'location':'Auditorium Pelvoux'}],
		'date':'AM'},
		
		{'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00',
		'topic':{'id':2,'name':'Are Agile software-development philosophy and CMMI (Capability Maturity Model Integration) antithetical?'},
			'speakers':[{'id':2,'name':'Matthew Philip'}],
			'location':'Auditorium Pelvoux'}],'date':'AM'},
			
		{'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00',
		'topic':{'id':3,'name':'Agile, dix ans après: ce qui a changé, ce qu\'il faut retenir'},
			'speakers':[{'id':3,'name':'Laurent Bossavit'}],'location':'Belle-Etoile'}],
			'date':'AM'},
		
		{'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00',
		'topic':{'id':4,'name':'Offre agile pour survivre dans la jungle économique'},
			'speakers':[{'id':4,'name':'Jérôme Barrand'}],
			'location':'Chartreuse'}],
			'date':'AM'},
			
		{'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00',
		'topic':{'id':6,'name':'Adoption d’Extreme Programming à Kelkoo'},
			'speakers':[{'id':6,'name':'Johan Martinsson'},{'id':7,'name':'Kevin Creix'},{'id':8,'name':'Jonathan Bonzy'}],
			'location':'Sept-Laux 5'}],
			'date':'AM'},
			
		{'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00',
		'topic':{'id':7,'name':'Je croyais tout savoir sur les User Stories !'},
			'speakers':[{'id':9,'name':'Pierre Vachon'}],
			'location':'Sept-Laux 4'}],
			'date':'AM'},
			
		{'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00',
		'topic':{'id':8,'name':'Management et Agilité : une potion magique'},
			'speakers':[{'id':10,'name':'Frederic Dufau-Joel'},{'id':11,'name':'Alexandre Boutin'}],
			'location':'Meije 3'}],
			'date':'AM'},
			
		{'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00',
		'topic':{'id':9,'name':'Build et Intégration Continue'},
			'speakers':[{'id':12,'name':'Emmanuel Hugonnet'},{'id':13,'name':'Guillaume Karcher'},{'id':14,'name':'Laurent Tardif'},{'id':15,'name':'Laurent Vaills'}],
			'location':'Meije 2'}],
			'date':'AM'},
			
		{'schedule':[{'seats':200,'starttime':'11:10','endtime':'12:40',
		'topic':{'id':10,'name':'L\'Equipe auto-organisée'},
			'speakers':[{'id':16,'name':'Quatuor Annesci'}],
			'location':'Auditorium Pelvoux'}],
			'date':'AM'},
		
	{'schedule':[{'seats':200,'starttime':'11:10','endtime':'12:10',
		'topic':{'id':11,'name':'Kanban depuis les tranchées'},
			'speakers':[{'id':17,'name':'Hervé Lourdin'},{'id':18,'name':'Cyril Megard'}],
			'location':'Belle-Etoile'}],
			'date':'AM'},
		
	{'schedule':[{'seats':200,'starttime':'11:10','endtime':'12:10',
		'topic':{'id':12,'name':'Vers la Production Agile d\'Informations'},
			'speakers':[{'id':19,'name':'José Gramdi'}],
			'location':'Chartreuse'}],
			'date':'AM'},
		
	{'schedule':[{'seats':200,'starttime':'11:10','endtime':'12:10',
		'topic':{'id':13,'name':'Atelier Story Map, là où tout commence...'},
			'speakers':[{'id':20,'name':'Olivier Pizzato'},{'id':21,'name':'Emmanuel Etasse'}],
			'location':'Sept-Laux 5'}],
			'date':'AM'},
		
{'schedule':[{'seats':200,'starttime':'11:10','endtime':'12:10',
		'topic':{'id':14,'name':'ePatient – Le CHU de Grenoble adopte la méthode SCRUM pour conduire ce projet'},
			'speakers':[{'id':22,'name':'Cathy Descombes'},{'id':23,'name':'François Talbot'},{'id':24,'name':'Loïc Faure'}],
			'location':'Sept-Laux 4'}],
			'date':'AM'},
		
{'schedule':[{'seats':200,'starttime':'11:10','endtime':'12:10',
		'topic':{'id':15,'name':'Enrichir ses méthodes avec des “Processus Unifiés” agiles'},
			'speakers':[{'id':25,'name':'Romain Couturier'}],
			'location':'Meije 3'}],
			'date':'AM'},
		
{'schedule':[{'seats':200,'starttime':'11:10','endtime':'12:10',
		'topic':{'id':16,'name':'Déploiement et configuration automatique d’application'},
			'speakers':[{'id':26,'name':'Nicolas Capponi'},{'id':14,'name':'Laurent Tardif'},{'id':27,'name':'Alain Delafosse'}],
			'location':'Meije 2'}],
			'date':'AM'},
				
		{'schedule':[{'seats':200,'starttime':'12:10','endtime':'13:30',
		'topic':{'id':88,'name':'Déjeuner'},
			'speakers':[{'id':50,'name':'CARA'}],
			'location':'Hall'}],
			'date':'AM'},
			
				
		{'schedule':[{'seats':200,'starttime':'13:30','endtime':'14:30',
		'topic':{'id':17,'name':'Keynote Aslak Hellesoy'},
			'speakers':[{'id':41,'name':'Aslak Hellesoy'}],
			'location':'Auditorium Pelvoux'}],
			'date':'PM'},
			
		{'schedule':[{'seats':200,'starttime':'14:30','endtime':'15:30',
		'topic':{'id':18,'name':'La machine à produire du logiciel'},
			'speakers':[{'id':28,'name':'François Brun'}],
			'location':'Auditorium Pelvoux'}],
			'date':'PM'},
		{'schedule':[{'seats':200,'starttime':'14:30','endtime':'15:30',
		'topic':{'id':19,'name':'Agility@Scale en pratique'},
			'speakers':[{'id':29,'name':'Jean-Yves Rigolet'}],
			'location':'Belle-Etoile'}],
			'date':'PM'},
		{'schedule':[{'seats':200,'starttime':'14:30','endtime':'15:30',
		'topic':{'id':20,'name':'L’Agilité au niveau du portfolio'},
			'speakers':[{'id':30,'name':'Jean Dupuis'},{'id':31,'name':'Jean-Francois Jagodzinski'}],
			'location':'Chartreuse'}],
			'date':'PM'},
		{'schedule':[{'seats':200,'starttime':'14:30','endtime':'15:30',
		'topic':{'id':21,'name':'Le Kanban de la naissance à la vie'},
			'speakers':[{'id':32,'name':'Cédric Joseph'},{'id':33,'name':'Vincent Lesne'},{'id':34,'name':'Maxime Ducros'}],
			'location':'Sept-Laux 5'}],
			'date':'PM'},
		{'schedule':[{'seats':200,'starttime':'14:30','endtime':'15:30',
		'topic':{'id':22,'name':'Transition agile & Accompagnement au changement'},
			'speakers':[{'id':35,'name':'Géraldine Gustin'},{'id':25,'name':'Romain Couturier'}],
			'location':'Sept-Laux 4'}],
			'date':'PM'},
		{'schedule':[{'seats':200,'starttime':'14:30','endtime':'15:30',
		'topic':{'id':23,'name':'Behaviour Driven Metrics : Même les chiffres peuvent être agiles!'},
			'speakers':[{'id':11,'name':'Alexandre Boutin'},{'id':21,'name':'Emmanuel Etasse'}],
			'location':'Meije 3'}],
			'date':'PM'},
		{'schedule':[{'seats':200,'starttime':'14:30','endtime':'15:30',
		'topic':{'id':24,'name':'TDD et Legacy'},
			'speakers':[{'id':36,'name':'Bernard Huguet'},{'id':37,'name':'Luc Jeanniard'},{'id':6,'name':'Johan Martinsson'}],
			'location':'Meije 2'}],
			'date':'PM'},
			
		{'schedule':[{'seats':200,'starttime':'15:30','endtime':'16:00',
		'topic':{'id':55,'name':'Pause café'},
			'speakers':[{'id':50,'name':'CARA'}],
			'location':'Hall'}],
			'date':'PM'},
		
		{'schedule':[{'seats':200,'starttime':'16:00','endtime':'17:00',
		'topic':{'id':25,'name':'Agile Testing en pratique'},
			'speakers':[{'id':39,'name':'Laurent Bristiel'},{'id':40,'name':'Fabien Maquet'}],
			'location':'Auditorium Pelvoux'}],
			'date':'PM'},
		{'schedule':[{'seats':200,'starttime':'16:00','endtime':'17:00',
		'topic':{'id':26,'name':'Comparaison de deux projets en démarche SCRUM réalisés par une SSII'},
			'speakers':[{'id':41,'name':'Pierre Capiomont '},{'id':42,'name':'Cédric Caillet'}],
			'location':'Belle-Etoile'}],
			'date':'PM'},
		{'schedule':[{'seats':200,'starttime':'16:00','endtime':'17:00',
		'topic':{'id':27,'name':'Embedded Agile'},
			'speakers':[{'id':43,'name':'Timo Punkka'}],
			'location':'Chartreuse'}],
			'date':'PM'},
		{'schedule':[{'seats':200,'starttime':'16:00','endtime':'17:00',
		'topic':{'id':28,'name':'Casino Game - Venez découvrir comment limiter votre TAF !'},
			'speakers':[{'id':44,'name':'Laurence Hanot'}],
			'location':'Sept-Laux 5'}],
			'date':'PM'},
		{'schedule':[{'seats':200,'starttime':'16:00','endtime':'17:00',
		'topic':{'id':29,'name':'L\'Agilité, clef du succès de notre projet?'},
			'speakers':[{'id':45,'name':'Cédric Chabry'},{'id':46,'name':'Denis Tomasicchio'},{'id':47,'name':'Christophe Ney'}],
			'location':'Sept-Laux 4'}],
			'date':'PM'},
		{'schedule':[{'seats':200,'starttime':'16:00','endtime':'17:00',
		'topic':{'id':30,'name':'Documentation et Agilité'},
			'speakers':[{'id':31,'name':'Jean-Francois Jagodzinski'}],
			'location':'Meije 3'}],
			'date':'PM'},
		{'schedule':[{'seats':200,'starttime':'16:00','endtime':'17:00',
		'topic':{'id':31,'name':'Kata Robozzle en Haskell'},
			'speakers':[{'id':48,'name':'Emmanuel Gaillot'}],
			'location':'Meije 2'}],
			'date':'PM'},
			
			
		{'schedule':[{'seats':200,'starttime':'17:10','endtime':'18:10',
		'topic':{'id':32,'name':'Il était une fois un MOA qui voulait devenir Product Owner... et qui y réussit !'},
			'speakers':[{'id':11,'name':'Alexandre Boutin'}],
			'location':'Auditorium Pelvoux'}],
			'date':'PM'},
		{'schedule':[{'seats':200,'starttime':'17:10','endtime':'18:10',
		'topic':{'id':33,'name':'L\'agilité : de la promesse à la réalité!'},
			'speakers':[{'id':49,'name':'Henri Darmet'}],
			'location':'Belle-Etoile'}],
			'date':'PM'},
		{'schedule':[{'seats':200,'starttime':'17:10','endtime':'18:10',
		'topic':{'id':34,'name':'Play soccer, not American football: How to foster a whole-team approach by thinking in activities rather than roles'},
			'speakers':[{'id':2,'name':'Matthew Philip'}],
			'location':'Chartreuse'}],
			'date':'PM'},
		{'schedule':[{'seats':200,'starttime':'17:10','endtime':'18:10',
		'topic':{'id':35,'name':'Le Lean et le déploiement stratégique (Hoshin Kanri)'},
			'speakers':[{'id':60,'name':'Sylvain Fortin'}],
			'location':'Sept-Laux 5'}],
			'date':'PM'},
		{'schedule':[{'seats':200,'starttime':'17:10','endtime':'18:10',
		'topic':{'id':36,'name':'Transatel : 2 ans et demi de mise en place de l’agilité'},
			'speakers':[{'id':51,'name':'Gabriel Le Van'},{'id':52,'name':'Jean-Baptiste Vilain'}],
			'location':'Sept-Laux 4'}],
			'date':'PM'},
		{'schedule':[{'seats':200,'starttime':'17:10','endtime':'18:10',
		'topic':{'id':37,'name':'Il faut cultiver son Code'},
			'speakers':[{'id':53,'name':'Benoit Gantaume'}],
			'location':'Meije 2'}],
			'date':'PM'},
		{'schedule':[{'seats':200,'starttime':'17:10','endtime':'18:10',
		'topic':{'id':38,'name':'Exigences Exécutables Efficaces : \'Doing the Right Software\''},
			'speakers':[{'id':54,'name':'Bruno Orsier'},{'id':55,'name':'Remy Sanlaville'}],
			'location':'Meije 3'}],
			'date':'PM'},
				
		{'schedule':[{'seats':200,'starttime':'18:30','endtime':'20:30',
		'topic':{'id':99,'name':'Apéro offert par le CARA à tous les présents'},
			'speakers':[{'id':50,'name':'CARA'}],
			'location':'Hall'}],
			'date':'PM'}			
			
			]; 
			      var append = false ;
		          for( var i=0; i < schedule_data.length; i++ ){
						if( schedule_data[i].date == salle){						
							Ext.getCmp('sessionList').getStore().loadData(schedule_data[i].schedule, append);					
							append = true;
						}						
					} 
			//this.sessions.doLayout();
			this.sessions.grouped = false;
			//this.sessions.refresh();	
			this.sessions.grouped = true;
			//this.sessions.getEl().refresh();		
			
			Ext.getBody().unmask();				
	}	
});


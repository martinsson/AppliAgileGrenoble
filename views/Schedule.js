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
{'schedule': [{'seats':0,'starttime':'08:00','endtime':'08:45', 'topic':{'id':47,'name':'Accueil autour d\'un café'},'speakers':[{'id':69,'name':'Club Agile Rhône Alpes'}], 'location':'Atrium'}],'date':'AM'},
{'schedule': [{'seats':450,'starttime':'08:45','endtime':'09:00', 'topic':{'id':41,'name':'Le mot des organisateurs & Sponsor SAMSE'},'speakers':[{'id':63,'name':'Club Agile Rhône Alpes'}], 'location':'Auditorium'}],'date':'AM'},
{'schedule': [{'seats':450,'starttime':'09:00','endtime':'09:45', 'topic':{'id':42,'name':'Starting An Agile Transition with Why'},'speakers':[{'id':64,'name':'Karl Scotland'}], 'location':'Auditorium'}],'date':'AM'},
{'schedule': [{'seats':530,'starttime':'10:00','endtime':'10:45', 'topic':{'id':1,'name':'Neuro-agilité: un nouveau regard sur la conception'},'speakers':[{'id':1,'name':'Laurent Bossavit'}], 'location':'Auditorium'}],'date':'AM'},
{'schedule': [{'seats':110,'starttime':'10:00','endtime':'10:45', 'topic':{'id':2,'name':'Les tests intégrés sont une arnaque!'},'speakers':[{'id':2,'name':'J. B. Rainsberger'}], 'location':'Makalu'}],'date':'AM'},
{'schedule': [{'seats':50,'starttime':'10:00','endtime':'10:45', 'topic':{'id':3,'name':'Alone in the dark'},'speakers':[{'id':3,'name':'Stéphane Hanser'}], 'location':'Kilimandjaro 1-2'}],'date':'AM'},
{'schedule': [{'seats':50,'starttime':'10:00','endtime':'10:45', 'topic':{'id':4,'name':'l\'Agilité ou comment doper l\'efficacité et la motivation des équipes'},'speakers':[{'id':4,'name':'Nicolas d\'Hennezel'}], 'location':'Kilimandjaro 3-4'}],'date':'AM'},
{'schedule': [{'seats':75,'starttime':'10:00','endtime':'10:45', 'topic':{'id':5,'name':'Dépasser l\'efficacité pour être agile : la proposition de l\'effissens'},'speakers':[{'id':7,'name':'Karim Benameur'}], 'location':'Mont Blanc 1-2-3'}],'date':'AM'},
{'schedule': [{'seats':25,'starttime':'10:00','endtime':'10:45', 'topic':{'id':6,'name':'Devenez le Product Owner de notre retour d’expérience'},'speakers':[{'id':8,'name':'Pierre Taillard'}], 'location':'Mont Blanc 4'}],'date':'AM'},
{'schedule': [{'seats':40,'starttime':'10:00','endtime':'10:45', 'topic':{'id':7,'name':'La session dont vous êtes le héros !'},'speakers':[{'id':11,'name':'Arnaud Benistant'}], 'location':'Cervin'}],'date':'AM'},
{'schedule': [{'seats':40,'starttime':'10:00','endtime':'10:45', 'topic':{'id':8,'name':'Un Kata Marrant'},'speakers':[{'id':13,'name':'Emmanuel Gaillot'}], 'location':'Everest'}],'date':'AM'},
{'schedule': [{'seats':530,'starttime':'11:10','endtime':'12:05', 'topic':{'id':9,'name':'Des Jeux Agiles pour apprendre'},'speakers':[{'id':15,'name':'Alexandre Boutin'}], 'location':'Auditorium'}],'date':'AM'},
{'schedule': [{'seats':110,'starttime':'11:10','endtime':'12:05', 'topic':{'id':10,'name':'Démonstration / Kata BDD sur un logiciel pilotant un instrument'},'speakers':[{'id':16,'name':'Matthieu Gironnet'}], 'location':'Makalu'}],'date':'AM'},
{'schedule': [{'seats':50,'starttime':'11:10','endtime':'12:05', 'topic':{'id':11,'name':'Cartographie agile de la gestion des produits'},'speakers':[{'id':18,'name':'Mack Adams'}], 'location':'Kilimandjaro 1-2'}],'date':'AM'},
{'schedule': [{'seats':50,'starttime':'11:10','endtime':'12:05', 'topic':{'id':12,'name':'Kanban, un tour d\'horizon'},'speakers':[{'id':19,'name':'Laurent Morisseau'}], 'location':'Kilimandjaro 3-4'}],'date':'AM'},
{'schedule': [{'seats':75,'starttime':'11:10','endtime':'12:05', 'topic':{'id':13,'name':'Agilité et approche systémique du risque'},'speakers':[{'id':20,'name':'Jacques Fleurat'}], 'location':'Mont Blanc 1-2-3'}],'date':'AM'},
{'schedule': [{'seats':25,'starttime':'11:10','endtime':'12:05', 'topic':{'id':14,'name':'It’s What You Don’t Do That Counts'},'speakers':[{'id':21,'name':'Susan Hunter'}], 'location':'Mont Blanc 4'}],'date':'AM'},
{'schedule': [{'seats':40,'starttime':'11:10','endtime':'12:05', 'topic':{'id':15,'name':'(ice)Scrum, agilité et rock\'n roll'},'speakers':[{'id':23,'name':'Claude Aubry'}], 'location':'Cervin'}],'date':'AM'},
{'schedule': [{'seats':40,'starttime':'11:10','endtime':'12:05', 'topic':{'id':16,'name':'La contractualisation d’un projet Agile : enjeux et pièges'},'speakers':[{'id':25,'name':'Jean-Philippe Leclere'}], 'location':'Everest'}],'date':'AM'},
{'schedule': [{'seats':450,'starttime':'12:20','endtime':'12:45', 'topic':{'id':43,'name':'Clean Code'},'speakers':[{'id':65,'name':'Clean Code'}], 'location':'Auditorium'}],'date':'AM'},
{'schedule': [{'seats':450,'starttime':'13:20','endtime':'13:35', 'topic':{'id':44,'name':'Slam!'},'speakers':[{'id':66,'name':'Un Deux Ground'}], 'location':'Auditorium'}],'date':'AM'},
{'schedule': [{'seats':0,'starttime':'','endtime':'', 'topic':{'id':48,'name':''},'speakers':[{'id':0,'name':''}], 'location':''}],'date':'AM'},
{'schedule': [{'seats':0,'starttime':'','endtime':'', 'topic':{'id':49,'name':''},'speakers':[{'id':0,'name':''}], 'location':''}],'date':'AM'},
{'schedule': [{'seats':450,'starttime':'13:35','endtime':'13:45', 'topic':{'id':45,'name':'Le mot des organisateurs & Sponsor SOGILIS'},'speakers':[{'id':67,'name':'Club Agile Rhône Alpes'}], 'location':'Auditorium'}],'date':'PM'},
{'schedule': [{'seats':450,'starttime':'13:45','endtime':'14:30', 'topic':{'id':46,'name':'How to Change the World'},'speakers':[{'id':68,'name':'Jürgen Appelo'}], 'location':'Auditorium'}],'date':'PM'},
{'schedule': [{'seats':530,'starttime':'14:45','endtime':'15:40', 'topic':{'id':17,'name':'Agile Offer Creation program in Schneider Electric'},'speakers':[{'id':27,'name':'Hervé Dondey'}], 'location':'Auditorium'}],'date':'PM'},
{'schedule': [{'seats':110,'starttime':'14:45','endtime':'15:40', 'topic':{'id':18,'name':'Maîtriser le legacy avec Mikado'},'speakers':[{'id':29,'name':'Johan Martinsson'}], 'location':'Makalu'}],'date':'PM'},
{'schedule': [{'seats':50,'starttime':'14:45','endtime':'15:40', 'topic':{'id':19,'name':'Agile Portfolio'},'speakers':[{'id':31,'name':'Fabrice Aimetti'}], 'location':'Kilimandjaro 1-2'}],'date':'PM'},
{'schedule': [{'seats':50,'starttime':'14:45','endtime':'15:40', 'topic':{'id':20,'name':'L\'architecte de l’expérience utilisateur, un membre clé des projets front end Agile/Lean: présentation du rôle, conseils de collaboration.'},'speakers':[{'id':32,'name':'Sophie Freiermuth'}], 'location':'Kilimandjaro 3-4'}],'date':'PM'},
{'schedule': [{'seats':75,'starttime':'14:45','endtime':'15:40', 'topic':{'id':21,'name':'Une bonne histoire !'},'speakers':[{'id':33,'name':'Pierre Vachon'}], 'location':'Mont Blanc 1-2-3'}],'date':'PM'},
{'schedule': [{'seats':25,'starttime':'14:45','endtime':'15:40', 'topic':{'id':22,'name':'Story Map : objectif feed-back !'},'speakers':[{'id':34,'name':'Thierry Vallée'}], 'location':'Mont Blanc 4'}],'date':'PM'},
{'schedule': [{'seats':40,'starttime':'14:45','endtime':'15:40', 'topic':{'id':23,'name':'Rétrospectives’lab : décantation'},'speakers':[{'id':35,'name':'Emilie Franchomme'}], 'location':'Cervin'}],'date':'PM'},
{'schedule': [{'seats':40,'starttime':'14:45','endtime':'15:40', 'topic':{'id':24,'name':'Scrum et innovation'},'speakers':[{'id':36,'name':'Fabrice Bazzaro'}], 'location':'Everest'}],'date':'PM'},
{'schedule': [{'seats':530,'starttime':'16:45','endtime':'17:10', 'topic':{'id':25,'name':'Ce que vous devez savoir à propos de la contractualisation Agile'},'speakers':[{'id':38,'name':'Jean-François Jagodzinski'}], 'location':'Auditorium'}],'date':'PM'},
{'schedule': [{'seats':110,'starttime':'16:45','endtime':'17:10', 'topic':{'id':26,'name':'Git au quotidien'},'speakers':[{'id':39,'name':'Guillaume Gardais'}], 'location':'Makalu'}],'date':'PM'},
{'schedule': [{'seats':50,'starttime':'16:45','endtime':'17:10', 'topic':{'id':27,'name':'Comment rendre nos entreprises Agile ?'},'speakers':[{'id':41,'name':'Frédéric Dufau-Joël'}], 'location':'Kilimandjaro 1-2'}],'date':'PM'},
{'schedule': [{'seats':50,'starttime':'16:45','endtime':'17:10', 'topic':{'id':28,'name':'REX Bascule en agile d\'un portefeuille de projets et TMA'},'speakers':[{'id':42,'name':'Jean Dupuis'}], 'location':'Kilimandjaro 3-4'}],'date':'PM'},
{'schedule': [{'seats':75,'starttime':'16:45','endtime':'17:10', 'topic':{'id':29,'name':'Manager agile : concrètement'},'speakers':[{'id':44,'name':'Thierry Cros'}], 'location':'Mont Blanc 1-2-3'}],'date':'PM'},
{'schedule': [{'seats':25,'starttime':'16:45','endtime':'17:10', 'topic':{'id':30,'name':'Jouer pour être plus Agile'},'speakers':[{'id':45,'name':'Jérôme Cuttaz'}], 'location':'Mont Blanc 4'}],'date':'PM'},
{'schedule': [{'seats':40,'starttime':'16:45','endtime':'17:10', 'topic':{'id':31,'name':'Retour sur 4 ans d’industrialisation de l’agilité chez Orange'},'speakers':[{'id':48,'name':'Rémy Genin'}], 'location':'Cervin'}],'date':'PM'},
{'schedule': [{'seats':40,'starttime':'16:45','endtime':'17:10', 'topic':{'id':32,'name':'Y a t-il un pilote dans le projet ?'},'speakers':[{'id':49,'name':'Laurence Hanot'}], 'location':'Everest'}],'date':'PM'},
{'schedule': [{'seats':530,'starttime':'17:25','endtime':'18:20', 'topic':{'id':33,'name':'Externalisation agile d\'un projet avionique : les ingrédients d\'un succès'},'speakers':[{'id':50,'name':'Etienne Zwiebel'}], 'location':'Auditorium'}],'date':'PM'},
{'schedule': [{'seats':110,'starttime':'17:25','endtime':'18:20', 'topic':{'id':34,'name':'Symphonie pour PHP industrialisé en agilité majeure'},'speakers':[{'id':51,'name':'Jonathan Bonzy'}], 'location':'Makalu'}],'date':'PM'},
{'schedule': [{'seats':50,'starttime':'17:25','endtime':'18:20', 'topic':{'id':35,'name':'KANBAN et SCRUM au sein d\'une agence digitale'},'speakers':[{'id':54,'name':'Christophe Ney'}], 'location':'Kilimandjaro 1-2'}],'date':'PM'},
{'schedule': [{'seats':50,'starttime':'17:25','endtime':'18:20', 'topic':{'id':36,'name':'Nos Product Owner (Pos), ils ressemblent à quoi aujourd’hui ?'},'speakers':[{'id':55,'name':'Isabelle Coelho'}], 'location':'Kilimandjaro 3-4'}],'date':'PM'},
{'schedule': [{'seats':75,'starttime':'17:25','endtime':'18:20', 'topic':{'id':37,'name':'Agilité et GRH'},'speakers':[{'id':59,'name':'Thomas Tarradas'}], 'location':'Mont Blanc 1-2-3'}],'date':'PM'},
{'schedule': [{'seats':25,'starttime':'17:25','endtime':'18:20', 'topic':{'id':38,'name':'Atelier NeuroAgile'},'speakers':[{'id':60,'name':'Laurent Bossavit'}], 'location':'Mont Blanc 4'}],'date':'PM'},
{'schedule': [{'seats':40,'starttime':'17:25','endtime':'18:20', 'topic':{'id':39,'name':'L\'agilité support au co-développement'},'speakers':[{'id':61,'name':'Manuel Vacelet'}], 'location':'Cervin'}],'date':'PM'},
{'schedule': [{'seats':40,'starttime':'17:25','endtime':'18:20', 'topic':{'id':40,'name':'Overcoming Distances: Scrum with Distributed Teams'},'speakers':[{'id':62,'name':'Silvana Wasitova'}], 'location':'Everest'}],'date':'PM'},
{'schedule': [{'seats':0,'starttime':'','endtime':'', 'topic':{'id':41,'name':''},'speakers':[{'id':0,'name':''}], 'location':''}],'date':'PM'},
{'schedule': [{'seats':0,'starttime':'','endtime':'', 'topic':{'id':42,'name':''},'speakers':[{'id':0,'name':''}], 'location':''}],'date':'PM'},
		
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


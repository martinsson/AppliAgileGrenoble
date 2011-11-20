cfunited.ui.SessionDetails = Ext.extend(Ext.Panel,{
	fullscreen:true,
	styleHtmlContent:true,
	monitorOrientation:false,
	scroll: 'vertical',
	initComponent: function(){

		this.titlebar = new Ext.Toolbar({
			title:'Session',
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
					'<strong>Sujet:</strong> {name}<br/>',
					'<strong>Horaire:</strong>',
						'<tpl for="schedule">',
							'<tpl if="xindex == 1">',
							' {starttime} - {endtime}<br/>',
							'</tpl>',
						'</tpl>',			
					'<strong>Orateur(s):</strong>',
						'<tpl for="speakers">',
							' {[xindex > 1 ? "," : ""]}{name}',
						'</tpl>',
					'<br/><strong>Lieu:</strong>',
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
			id:'sDataView',
			fullscreen:true,
			tpl:this.tpl,
            store: new Ext.data.Store({
				model: 'Session'
            })
		});
		
		this.dockedItems = [this.titlebar];
		this.items = [this.dv];
			
		cfunited.ui.SessionDetails.superclass.initComponent.apply(this,arguments);
		
	},
	
	onBack: function(){
		Ext.getCmp('schedule-card').setCard(0);
	},

	loadSession: function(id){
		Ext.getBody().mask(false, '<div class="loading">Loading&hellip;</div>');
		var session_data = new Object();
		
		
		session_data[50] =
		{'id':50,'schedule':[{'seats':450,'starttime':'08:00','endtime':'08:45','date':'AM','location':'Accueil'}],'description':'...','name':'Accueil autour d\'un café','speakers':[{'id':50,'name':'CARA'}]};

		session_data[5] =
		{'id':5,'schedule':[{'seats':450,'starttime':'08:45','endtime':'09:00','date':'AM','location':'Auditorium Pelvoux'}],'description':'...','name':'Le mot des organisateurs','speakers':[{'id':50,'name':'CARA'}]};

		
	session_data[1] =
		{'id':1,'schedule':[{'seats':450,'starttime':'9:00','endtime':'10:00','date':'2010-07-28','location':'Auditorium Pelvoux'}],'description':'Claude Aubry est l\'auteur du livre : “Scrum, le guide pratique de la méthode agile la plus populaire”, premier livre sur Scrum en français, publié aux éditions Dunod en février 2010.','name':'Keynote Claude Aubry','speakers':[{'id':1,'name':'Claude Aubry'}]};

		session_data[2] = 
		{'id':2,'schedule':[{'seats':450,'starttime':'10:00','endtime':'11:00','date':'2010-07-29','location':'Auditorium Pelvoux'}],'description':'Although Agile, with its focus on lightweight methods and delivering, and CMMI, a business-process improvement model with a reputation for heavyweight methods and useless documentation, seem at odds with each other, it is possible to do both -– and do them seamlessly. Given the fact that marrying agile and CMMI is not done very often throughout the industry, this presentation relates a real-life experience of fusing these two disciplines and what it means for software development and ultimately the beneficiary of that software. Agile practitioners and managers who are considering CMMI will learn some basic principles for successfully implementing CMMI in an agile organization in an agile way. ','name':'Are Agile software-development philosophy and CMMI (Capability Maturity Model Integration) antithetical? A story of successful methodology merger','speakers':[{'id':2,'name':'Matthew Philip'}]} ;
		
		session_data[3] =
		{'id':3,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':'Belle-Etoile'}],'description':'Notre industrie du logiciel connaît une crise qui remonte quasiment à sa naissance; cette “crise du logiciel” a été le prétexte à fonder en 1968 une discipline désormais connue sous le nom de Génie Logiciel. Bien que cette discipline constitue le socle pédagogique de la formation, tout laisse penser que cette crise, loin d\'être résolue, ne peut qu\'aller en s\'aggravant. Apparues il y a dix ans, les approches Agiles sont-elles susceptibles d\'avoir un plus grand impact? Créditées de quelques succès, elles sont aussi très critiquées. Cet exposé accessible aux débutants comme aux agilistes confirmés, laissant une large part aux questions et réponses, offrira une occasion d\'aborder les questions de votre choix, sans aucun tabou ni faux-semblant. Les objectifs de cette présentation sont de mieux comprendre ce qu\'on entend par « Agile », et de repartir avec quelques pistes de pratiques nouvelles à essayer.','name':'Agile, dix ans après: ce qui a changé, ce qu\'il faut retenir','speakers':[{'id':3,'name':'Laurent Bossavit'}]} ;
		
		session_data[4] =
		{'id':4,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':'Chartreuse'}],'description':'Mieux comprendre le monde économique dans ses nouvelles caractéristiques et mieux comprendre les nouvelles offres des entreprises pour mieux faire évoluer sa relation avec le client : prospective du contexte économique, caractéristiques de l’offre globale agile, définition de la nouvelle relation client-fournisseur, comportements adéquats. Les participants repartiront avec la conviction que l’agilité n’est pas qu’une mode et que sa portée va bien au-delà de la « programmation informatique ». Conférence d’ouverture des esprits.','name':'Offre agile pour survivre dans la jungle économique','speakers':[{'id':4,'name':'Jérôme Barrand'}]} ;			
		
		session_data[6] =
		{'id':6,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':'Sept-Laux 5'}],'description':'Venez voir comment Kelkoo a passé 50% des équipes au TDD et BDD en 10 mois! Pourquoi Kelkoo a choisi d’adopter l’Extreme Programming? Comment y faire adhérer les équipes? Quel temps a-t-il fallu pour maitriser le TDD? Pourquoi Pair-Programmer à plein temps? Quels sont les résultats? Quel impact sur les compétences de développement et sur la cohésion d’équipe? Nous allons suivre le progrès des équipes mois par mois. Nous voulons témoigner de ce virage complexe et partager les pratiques et les outils qui nous ont permis de faciliter l’adoption de l’Extreme Programming dans l’entreprise. Enfin, partagez vos propres difficultés, inquiétudes, questions et expériences! 20 minutes d’Open Space en petits groupes (plusieurs Kelkoo(s) seront là). Le passage au XP démystifié ! Les recettes de notre adoption (et nos erreurs) peuvent vous aider à réussir chez vous. Venez nouer des contacts pour une entraide dans la durée.','name':'Adoption d’Extreme Programming à Kelkoo','speakers':[{'id':6,'name':'Johan Martinsson'},{'id':7,'name':'Kevin Creix'},{'id':8,'name':'Jonathan Bonzy'}]} ;			
		
			session_data[7] =
		{'id':7,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':'Sept-Laux 4'}],'description':'Formation sur les User Stories et le sprint planning : Comment écrire les User Stories ? Quelles en sont les composantes-clé ? Comment en juger la qualité ? La méthode de priorisation MoSCoW. Jumeler la méthode avec les BVP (business value points) : méthode de prédiction des sprints. Introduction du Capacity Planning. Discussion sur le Capacity Planning et les Story Points. Les participants seront à même de mieux comprendre les concepts de User Stories et leur raisons d\'être, de mieux planifier et prioritiser les sprints, et d\'en prédire le risque.','name':'Je croyais tout savoir sur les User Stories !','speakers':[{'id':9,'name':'Pierre Vachon'}]} ;			
		
		session_data[8] =
		{'id':8,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':'Meije 3'}],'description':'Le rôle de Manager est difficile et la littérature regorge de conseils et autres pratiques pour être plus efficace dans cette activité. Permettre à ses équipes d’atteindre le niveau de performance attendu tout en maintenant un bon état d’esprit, une bonne ambiance et des individus motivés est un magnifique challenge. En ajoutant quelques pratiques Agile et Lean dans cet environnement performant, la potion devient réellement magique et l’efficacité est vraiment au rendez-vous. Venez partager une expérience réussie à la SAMSE et discuter en face-à-face avec Frédéric sur la manière dont il manage des équipes agiles.','name':'Management et Agilité : une potion magique','speakers':[{'id':10,'name':'Frederic Dufau-Joel'},{'id':11,'name':'Alexandre Boutin'}]} ;			


		session_data[9] =
		{'id':9,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':'Meije 2'}],'description':'Je me perds dans les différentes versions de librairies,</br>Je n’ai pas le temps de relancer tous les tests à chaque modification du code,</br>Ça marche chez moi mais pas sur la machine de Laurent,</br>Je n’ai pas le temps de mettre en place une plateforme d\'intégration continue,</br>Je passe trop de temps à intégrer les travails des autres membres de l’équipe,</br>Si les tests ne passent plus c\'est à cause de mes modifications ou parce que je vient de récupérer le code de Laurent… pourtant il va bien falloir que les développements de toute l\'équipe s\'intègrent bien à chaque commit. Venez trouver des réponses à ces questions en participant à un atelier.Les participants repartiront avec des techniques pour maitriser les étapes de build et seront convaincus que maîtriser leur build améliore l’efficacité de l’équipe.','name':'Build et Intégration Continue','speakers':[{'id':12,'name':'Emmanuel Hugonnet'},{'id':13,'name':'Guillaume Karcher'},{'id':14,'name':'Laurent Tardif'},{'id':15,'name':'Laurent Vaills'}]} ;			


		
		session_data[10] =
		{'id':10,'schedule':[{'seats':200,'starttime':'11:10','endtime':'12:40','date':'2010-07-30','location':'Auditorium Pelvoux'}],'description':'Un quatuor n\'a pas de chef d\'orchestre, c\'est une équipe qui s\'auto organise, et qui parvient à l\'excellence.<br/>Comment conjuguer projet collectif et expression individuelle ?<br/>Créativité individuelle et interdépendance ?<br/>Quelle dynamique pour animer un groupe ?<br/>Comment susciter l’émotion et l’adhésion?<br/>Comment faire face à l’imprévisible et s’adapter aux évolutions ?<br/>Autant d’interrogations qui, avec l’aide de la métaphore musicale, stimulent la sensibilité et l’esprit.La force du quatuor Annesci est de créer une interaction avec les participants : mises en situation, direction d’orchestre, séquences musicales…, une leçon ludique de management… Agile ?','name':'L\'Equipe auto-organisée','speakers':[{'id':16,'name':'Quatuor Annesci'}]} ;			
		
		
		session_data[11] =
		{'id':11,'schedule':[{'seats':200,'starttime':'11:10','endtime':'12:10','date':'2010-07-30','location':'Belle-Etoile'}],'description':'Il y a quelques temps, un nouveau mot faisait son apparition dans le monde du développement logiciel : Kanban. Qu’est-ce ? Est-ce bien ? Est-ce simple à mettre en œuvre ? Cela remplace-t-il Scrum ? Cela fonctionne-t-il réellement ? C’est à toutes ces questions que nous nous proposons de répondre en nous appuyant sur nos retours « en direct des tranchées » de nos projets agiles… Les participants partiront avec un retour d’expérience sur le déploiement et l’utilisation de Kanban pour le développement logiciel. Quels sont les bénéfices, les pièges à éviter, les recommandations, les questions en suspens…','name':'Kanban depuis les tranchées','speakers':[{'id':17,'name':'Hervé Lourdin'},{'id':18,'name':'Cyril Megard'}]} ;			

				session_data[12] =
		{'id':12,'schedule':[{'seats':200,'starttime':'11:10','endtime':'12:10','date':'2010-07-30','location':'Chartreuse'}],'description':'Les systèmes industriels produisent des biens matériels destinés à des clients pour satisfaire leurs besoins (d\'équipement).Un système d\'information produit des informations destinées à des clients pour satisfaire leurs besoins (de décision). Cette analogie simple ouvre des perspectives vertigineuses dès lors qu\'on la pousse dans ses retranchements et que l\'on se focalise sur les vraies caractéristiques du besoin de décision des clients. Elle fait voler en éclat la façon dont on aborde traditionnellement le SI dans les organisations et trace de nouvelles voies pour la relation DSI/utilisateurs de demain (de la contractualisation à la mesure de performance). Les plus formidables gisements de performance résident ici et ne sont que trop rarement explorés/exploités. Nous allons donc voir dans quelle mesure le système d\'information peut être conçu et géré avec l\'obsession de ses clients, les décideurs stratégiques, tactiques et opérationnels pour définitivement basculer de l\'administration différée des ressources au pilotage temps-réel de la performance et ainsi tendre vers l\'entreprise agile. L\'agilité apparaissant comme la parfaite symbiose entre les nouveaux principes de management (Lean, Six Sigma) et les nouvelles possibilités offertes par les technologies de l\'information. Dans ce nouveau paradigme, chaque nouvelle ligne de code, chaque nouvelle brique logicielle, chaque nouveau paramétrage doit être pensé avec l\'obsession de la performance, de la synchronisation, de l\'analyse et de l\'amélioration continue. Les participants repartiront avec une nouvelle vision et une remise en question profonde de la façon dont ils abordaient la mission de la DSI jusqu\'à lors! L\'action qui en découlera sera par exemple de repenser fondamentalement (ou de mettre en place…) la relation DSI-utilisateurs d\'informations ainsi que ses indicateurs de performance, et au final de peut-être même repenser le SI de la DSI!…','name':'Vers la Production Agile d\'Informations','speakers':[{'id':19,'name':'José Gramdi'}]} ;			
		
		session_data[13] =
		{'id':13,'schedule':[{'seats':200,'starttime':'11:10','endtime':'12:10','date':'2010-07-30','location':'Sept-Laux 5'}],'description':'L\'atelier “story map” formalisé par Jeff Patton est un atelier qui permet de créer collectivement le product backlog à partir de la vision de ce que l\'on veut réaliser. Dans les contextes de transition vers l\'agile c\'est un atelier clef qui arrive souvent à un moment où les participants n\'ont pas encore commencé à travailler ensemble, ne sont pas peut être pas encore familier avec l\'agile, et cela pour construire collectivement la liste des fonctionnalités à réaliser. Cette session sera composée d\'une partie de mise en pratique de cet atelier et d\'une partie d\'échange et de retours d\'expérience sur ses facteurs clefs de succès. Les participants auront l\occasion d\'expérimenter l\'atelier story map et d\'échanger avec des praticiens expérimentés sur ses facteurs clefs de réussite.','name':'Atelier Story Map, là où tout commence...','speakers':[{'id':20,'name':'Olivier Pizzato'},{'id':21,'name':'Emmanuel Etasse'}]} ;			
		
		session_data[14] =
		{'id':14,'schedule':[{'seats':200,'starttime':'11:10','endtime':'12:10','date':'2010-07-30','location':'Sept-Laux 4'}],'description':'En 2009 le CRIH des Alpes, décide de dynamiser et d’améliorer ses développements logiciels en apportant de l’agilité dans ses projets. Le choix se porte sur Scrum et sur l’approche Test Driven Development. Un premier projet, ePatient – Prise de rendez-vous par internet, est démarré en novembre 2009 avec le soutien d’Osiatis Ingénierie, SSII retenue sur ce marché. Un an après le démarrage et deux mois après le déploiement en production, venez bénéficier du retour d’expérience de l’équipe sur la méthode et les outils d’intégration continue. Cette présentation vous permettra de ressentir comment aborder au mieux la méthode Scrum dans vos projets, ou d’améliorer votre pratique en tirant profit de l’expérience d’un projet mené sur près d’un an.','name':'ePatient – Le CHU de Grenoble adopte la méthode SCRUM pour conduire ce projet','speakers':[{'id':22,'name':'Cathy Descombes'},{'id':23,'name':'François Talbot'},{'id':24,'name':'Loïc Faure'}]} ;			
		
		session_data[15] =
		{'id':15,'schedule':[{'seats':200,'starttime':'11:10','endtime':'12:10','date':'2010-07-30','location':'Meije 3'}],'description':'Les méthodes agiles mettent au placard de nombreuses méthodes de projet dont les défauts (lourdeur, incompréhension des attentes finales, manque de priorités) ont marqué de leur empreinte l\'échec ou le demi-succès des projets. Longtemps associé à cette image, le “Processus Unifié” s\'accorde pourtant avec le manifeste agile et complète les méthodes connues comme Scrum ou XP sur les moyens et gros projets. Cette session vous propose de parcourir d’autres interprétations et applications du “Processus Unifié” à travers ses différentes versions simplifiées et agiles : Agile Unified Process, Open UP et EssUP. Bénéfices attendus pour les participants :</br>Comprendre comment orchester différentes méthodes agiles dans un seul et même processus</br>Comprendre les différentes phases du “Processus Unifié” et leurs objectifs</br>Orchestrer des disciplines projets à travers les phases du “Processus Unifié” toujours en agile</br>Comprendre les rôles et les artefacts essentiels, minimum et suffisants','name':'Enrichir ses méthodes avec des “Processus Unifiés” agiles','speakers':[{'id':25,'name':'Romain Couturier'}]} ;			
		
	
	session_data[16] =
		{'id':16,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':'Meije 2'}],'description':'Je ne maîtrise pas ma procédure d\'installation<br/>J\'appréhende chaque déploiement car c\'est long et compliqué<br/>Je ne sais pas à quelle version de mon code correspondent mes binaires en production,<br/>Je ne sais pas exactement ce que contient mon application,<br/>Je ne fais pas valider ma procédure d\'installation par la QA<br/> … et pourtant je dois bien livrer de nouvelles fonctionnalités régulièrement.<br/> Venez nous rejoindre pour répondre à ces questions en participant à un atelier. Les participants repartiront avec des techniques pour maîtriser le déploiement, et seront convaincus que maîtriser et automatiser le déploiement améliore la qualité logicielle et l’efficacité de l’équipe.','name':'Déploiement et configuration automatique d’application','speakers':[{'id':26,'name':'Nicolas Capponi'},{'id':14,'name':'Laurent Tardif'},{'id':27,'name':'Alain Delafosse'}]} ;			
		
		session_data[88] =
		{'id':88,'schedule':[{'seats':200,'starttime':'12:10','endtime':'13:30','date':'2010-07-30','location':'Hall'}],'description':'...','name':'Déjeuner','speakers':[{'id':50,'name':'CARA'}]} ;			
		
		session_data[17] =
		{'id':17,'schedule':[{'seats':200,'starttime':'13:30','endtime':'14:30','date':'2010-07-30','location':'Auditorium Pelvoux'}],'description':'Aslak travaille avec des équipes agiles depuis 2003 et a contribué à plus d\'une douzaine de projets Open Source, et récemment plus particulièrement sur Cucumber (http://cukes.info), un framework très populaire basé sur Ruby pour le BDD (Behaviour Driven Development)','name':'Keynote Aslak Hellesoy','speakers':[{'id':41,'name':'Aslak Hellesoy'}]} ;			
		
		session_data[18] =
		{'id':18,'schedule':[{'seats':200,'starttime':'14:30','endtime':'15:30','date':'2010-07-30','location':'Auditorium Pelvoux'}],'description':'Une des premières difficultés pour adopter les méthodes agiles est de passer du cycle en cascade au cycle itératif. En utilisant une analogie simple avec « l’automatique » je vais faire émerger les tenants et aboutissants de la production de logiciel industriel. Déduire de cette approche les bénéfices du cycle itératif et incrémental pour le développement logiciel. Monter à cette occasion, en utilisant une autre analogie avec « l’artisanat », que les métriques « internes » pour mesurer l’avancement et/ou la productivité en développement ne sont pas pertinentes. Vous serez convaincus (et aurez des arguments pour convaincre), que le cycle itératif et incrémental est un bon moyen pour maîtriser un développement logiciel. Vous serez convaincus (et aurez des arguments pour convaincre), que le « nombre de lignes de code source / heure » ne devrait plus être utilisé pour piloter un développement !','name':'La machine à produire du logiciel','speakers':[{'id':28,'name':'François Brun'}]} ;			
		
		session_data[19] =
		{'id':19,'schedule':[{'seats':200,'starttime':'14:30','endtime':'15:30','date':'2010-07-30','location':'Belle-Etoile'}],'description':'Découvrez comment une équipe de développement IBM, à l\'aide de Rational Team Concert, vit sa transformation en adoptant une démarche agile. Mais les méthodes agile peuvent être fragile, aussi ce retour d’expérience permettra de comprendre comment renforcer, au quotidien, la collaboration entre les développeurs et également partager les compétences et à rendre plus agile l\'ensemble du processus de développement. Venez pour mieux appréhender les méthodes de développement agile pour gagner en qualité et efficacité.','name':'Agility@Scale en pratique','speakers':[{'id':29,'name':'Jean-Yves Rigolet'}]} ;			
		
		session_data[20] =
		{'id':20,'schedule':[{'seats':200,'starttime':'14:30','endtime':'15:30','date':'2010-07-30','location':'Chartreuse'}],'description':'Dans les organisations il existe plusieurs niveaux de maturité en gestion de portefeuille de projets. Au niveau le plus bas la gestion se réduit à une simple liste des projets en cours. Au niveau de maturité le plus élevé un processus lourd de priorisation est mis en place mais son retour sur investissement est loin d’être satisfaisant. Et si l\'agilité nous ouvrait de nouvelles perspectives ? Quel serait alors le modèle de portfolio management à mettre en oeuvre pour permettre le développement prioritaire de toutes les fonctions à très haute valeur ajoutée pour l’organisation (quel que soit le projet) ? Les participants repartiront avec une vision nouvelle sur les impacts positifs du basculement des projets en mode Agile au niveau de l’organisation du SI de l’entreprise.','name':'L’Agilité au niveau du portfolio','speakers':[{'id':30,'name':'Jean Dupuis'},{'id':31,'name':'Jean-Francois Jagodzinski'}]} ;			
		
		session_data[21] =
		{'id':21,'schedule':[{'seats':200,'starttime':'14:30','endtime':'15:30','date':'2010-07-30','location':'Sept-Laux 5'}],'description':'Au cours de cette session, nous avons choisi de vous présenter l’arrivée d’un nouveau membre dans notre équipe : le Kanban. Au travers de notre environnement métier et de notre expérience, nous vous exposerons de manière ludique et interactive les mutations qu’il a subit pour représenter notre réalité. Pour autant, même si le Kanban s’adapte à nos besoins, il ne résout pas tous les problèmes. C’est pour cela que nous échangerons aussi avec vous sur la façon dont nous nous sommes adaptés au Kanban.','name':'Le Kanban de la naissance à la vie','speakers':[{'id':32,'name':'Cédric Joseph'},{'id':33,'name':'Vincent Lesne'},{'id':34,'name':'Maxime Ducros'}]} ;			
		
		session_data[22] =
		{'id':22,'schedule':[{'seats':200,'starttime':'14:30','endtime':'15:30','date':'2010-07-30','location':'Sept-Laux 4'}],'description':'Des pressions externes grandissantes poussent les entreprises à changer leurs organisations pour s\'adapter et développer la réactivité. Les SI, eux aussi sont impactés. L\'agilité devient une alternative pertinente pour accélérer la mise en oeuvre de produits et sécuriser les développements. Premier challenge : définir l\'organisation agile adaptée au contexte de votre entreprise. Mais au-delà, la réelle complexité réside dans l\'implication des hommes à tous les échelons. L\'évolution des habitudes de travail doit être couplée à l\'évolution des habitudes de conception des solutions informatiques. Nous vous proposons un premier cadre de réflexion sur la transition organisationnelle nécessaire au déploiement de l\'agilité. Bénéfices attendus pour les participants:<br/>Comprendre les enjeux, les objectifs et les contraintes d’une transition vers l’agilité<br/>Avoir quelques pistes pour démarrer une transition efficace<br/>Dessiner sa propre stratégie à partir de cas concrets','name':'Transition agile & Accompagnement au changement','speakers':[{'id':35,'name':'Géraldine Gustin'},{'id':25,'name':'Romain Couturier'}]} ;			
		
		session_data[23] =
		{'id':23,'schedule':[{'seats':200,'starttime':'14:30','endtime':'15:30','date':'2010-07-30','location':'Meije 2'}],'description':'Nous proposons dans cette session de décrire une nouvelle approche que nous appelons BDM (Behaviour Driven Metrics) ou établissement de métriques pilotée par le comportement. Selon les auteurs de « The Balanced Scorecard », Robert S. Kaplan et David P. Norton, 1996, « Vous obtenez ce que vous mesurez », il nous faut des objectifs pour avancer mais nous avons également une tentation bien humaine à n’en faire que le juste nécessaire. Lors de cette session vous découvrirez une approche basée sur le comportement pour évaluer des métriques agiles et vous serez également sollicités en petits groupes pour appliquer cette approche sur des cas concrets que vous proposerez. Bénéfices attendus pour les participants : <br/>Découvrir et pratiquer l’approche agile BDM<br/>Disposer d’un réel outil pour évaluer l’utilité d’une métrique d’un point de vue<br/>comportemental.<br/>Prendre du plaisir à travailler et discuter en petits groupes auto-gérés.','name':'Behaviour Driven Metrics : Même les chiffres peuvent être agiles!','speakers':[{'id':11,'name':'Alexandre Boutin'},{'id':21,'name':'Emmanuel Etasse'}]} ;			
		
		session_data[24] =
		{'id':24,'schedule':[{'seats':200,'starttime':'14:30','endtime':'15:30','date':'2010-07-30','location':'Meije 3'}],'description':'Je ne comprends pas le comportement du code,<br/>Je n\'arrive pas à le faire évoluer,<br/>J\'ai pas de garantie de non-régression,<br/>J\'ai du mal à le tester,<br/>… et pourtant il va bien falloir ajouter des fonctionnalités. Venez assister à la correction d\'un bug et l\'ajout d\'une fonctionnalité dans un logiciel non testé en utilisant les techniques de TDD dans du legacy code. Les participants repartiront avec des techniques pour travailler avec du code non testé, et seront convaincus que le TDD dans du legacy code est possible et efficace.','name':'TDD et Legacy','speakers':[{'id':36,'name':'Bernard Huguet'},{'id':37,'name':'Luc Jeanniard'},{'id':6,'name':'Johan Martinsson'}]} ;			
		
		session_data[55] =
		{'id':55,'schedule':[{'seats':200,'starttime':'15:30','endtime':'16:00','date':'2010-07-30','location':'Hall'}],'description':'...','name':'Pause Café','speakers':[{'id':50,'name':'CARA'}]} ;			
		
		session_data[25] =
		{'id':25,'schedule':[{'seats':200,'starttime':'16:00','endtime':'17:00','date':'2010-07-30','location':'Auditorium Pelvoux'}],'description':'Retour d\'expérience des pratiques de tests Agile chez un éditeur de logiciels financiers. Après 18 mois d\'activité de test dans un contexte Scrum/XP, les testeurs ont enregistré un certain nombre succès directement dus aux nouvelles pratiques et ont rencontrés aussi quelques difficultés qui ont mené à des adaptations des méthodes. Cette présentation se veut un bilan des tests Agile théoriques confrontés à la réalité d\'une application complexe. Le participant pourra voir, sur la base d\'un exemple réel, les succès, difficultés et adaptations possibles des pratiques de tests Agile.','name':'Agile Testing en pratique','speakers':[{'id':39,'name':'Laurent Bristiel'},{'id':40,'name':'Fabien Maquet'}]} ;	
		
		session_data[26] =
		{'id':26,'schedule':[{'seats':200,'starttime':'16:00','endtime':'17:00','date':'2010-07-30','location':'Belle-Etoile'}],'description':'Comparaison de deux projets en démarche SCRUM réalisés par une SSII<br/>Un projet avec une équipe présente chez le client<br/>Un projet avec une équipe distribuée sur plusieurs sites<br/>Identifier les points communs et les différences sur l’organisation et le déroulement de deux projets en démarche SCRUM.<br/>Bénéfices attendus pour les participants :<br/>Pouvoir identifier les problèmes rencontrés sur des projets en démarche SCRUM en fonction de l’organisation de l’équipe et de l’analyse des rétrospectives.<br/>Identifier si possible les gains et/ou les déperditions de productivité d’une équipe externalisée face à une équipe chez le client','name':'Comparaison de deux projets en démarche SCRUM réalisés par une SSII','speakers':[{'id':41,'name':'Pierre Capiomont '},{'id':42,'name':'Cédric Caillet'}]} ;	
		
		session_data[27] =
		{'id':27,'schedule':[{'seats':200,'starttime':'16:00','endtime':'17:00','date':'2010-07-30','location':'Chartreuse'}],'description':'Agile methods have been the most talked topic of this millenium in product development. In this talk I view embedded Agile from practical point of view. I will go through how values, principles and even techniques of Agile software development can be adapted to development that has dependencies outside software development. The presentation will help audience to realize how different practices support each other and how agile development affects also the rest of the organization. Real world stories from 7 year journey in different roles with embedded Agile are used to illustrate the challenges and possible solutions. Audience will gain knowledge on several areas in embedded development: automated testing and continuous integration, incremental co-design, ISO9001, long test agency processes, customer role, etc…','name':'Embedded Agile','speakers':[{'id':43,'name':'Timo Punkka'}]} ;	
		
		session_data[28] =
		{'id':28,'schedule':[{'seats':200,'starttime':'16:00','endtime':'17:00','date':'2010-07-30','location':'Sept-Laux 5'}],'description':'Venez jouer à un jeu de simulation d’un Casino à l’aide d’un kanban et voir par une technique imparable comment améliorer le flux de production d’une équipe en limitant son WIP (Work In Progress). Venez prendre conscience de l’intérêt du kanban et de limiter les tâches qui s’empilent dans un flux de production.','name':'Casino Game - Venez découvrir comment limiter votre TAF !','speakers':[{'id':44,'name':'Laurence Hanot'}]} ;	
		
		session_data[29] =
		{'id':29,'schedule':[{'seats':200,'starttime':'16:00','endtime':'17:00','date':'2010-07-30','location':'Sept-Laux 4'}],'description':'Fin 2009, nous lancions pour GL events, groupe leader dans le secteur l\'évènementiel, un projet d\' « usine à site Web » en management agile SCRUM. Il y a quelques mois, se tenait la revue du dernier sprint, d_\'un projet ayant donné naissance à une solution innovante, pertinente et efficiente au regard de la stratégie Web retenue par GL events. Dans ce retour d\'expérience, nous témoignerons des raisons qui nous ont conduit au choix de l\'agilité et de SCRUM, présenterons les outils agiles que nous avons mis en place, discuterons des challenges que nous avons relevés et enfin des leçons que nous en avons tirées. Bénéfices attendus pour les participants:<br/>Faire connaitre les bénéfices de l\'agilité sur 3 volets; la conduite de projets stratégiques; la qualité de la relation client-fournisseur, la liberté d\'innovation sur des projets au forfait.','name':'L\'Agilité, clef du succès de notre projet?','speakers':[{'id':45,'name':'Cédric Chabry'},{'id':46,'name':'Denis Tomasicchio'},{'id':47,'name':'Christophe Ney'}]} ;	
		
		session_data[30] =
		{'id':30,'schedule':[{'seats':200,'starttime':'16:00','endtime':'17:00','date':'2010-07-30','location':'Meije 3'}],'description':'La documentation est une question récurrente des organisations qui découvrent le mode de fonctionnement agile pour les projets. Les bases du manifeste Agile “un logiciel opérationnel plutôt qu`\'une documentation exhaustive” ainsi que le fait de privilégier l\'accueil du changement perturbent la logique actuelle dont les fondations reposent avant tout sur la documentation. Le but de cette présentation est de répondre aux interrogations que suscite la logique Agile. La documentation ne disparaît pas, c\'est son rôle qui change. Sa forme, son contenu, son mode de production s\'en trouvent affectés. En modifiant son point d\'observation les choses deviennent plus claires. Les participants auront des éléments qui les aideront à s’orienter vers des solutions pouvant répondre à leur préoccupation.','name':'Documentation et Agilité','speakers':[{'id':31,'name':'Jean-Francois Jagodzinski'}]} ;	
		
		session_data[31] =
		{'id':31,'schedule':[{'seats':200,'starttime':'16:00','endtime':'17:00','date':'2010-07-30','location':'Meije 2'}],'description':'Haskell est un langage de programmation fonctionnelle qui retient de plus en plus l\'attention des développeurs agiles, par son niveau d\'abstraction, son élégance et sa concision. Il s\'appuie cependant sur un paradigme radicalement différent de la construction logicielle orientée objet, et peut rebuter par sa différence avec des langages plus classiques comme Java. Cette session propose de présenter quelques aspects de Haskell par l\'exemple, au travers de la programmation complète en TDD d\'un exercice inspiré du jeu Robozzle. L\'intention de l\'orateur est de donner envie à l\'assistance de découvrir davantage Haskell et les concepts de programmation qui lui sont associés. Venez découvrir Haskell et voir comment on peut l\'utiliser pour implémenter une fonctionnalité non triviale et apprendre par l\'exemple comment utiliser TDD avec un langage fonctionnel','name':'Kata Robozzle en Haskell','speakers':[{'id':48,'name':'Emmanuel Gaillot'}]} ;	
		
		
		
/*		
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
		session_data[] =
		{'id':,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':''}],'description':'','name':'','speakers':[{'id':,'name':''}]} ;			
		
	*/			
			
       	Ext.getCmp('sDataView').update(session_data[id]);
		
		Ext.getBody().unmask();	
           
        		
	
	}
	
});


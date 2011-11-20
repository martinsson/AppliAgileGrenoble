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
		

session_data[0] = {'id':0,'schedule':[{'seats':0,'starttime':'','endtime':'','date':'2011-11-24','location':''}],'description':'10:45','name':'10:00','speakers':[{'id':0,'name':'0'}]};
session_data[1] = {'id':1,'schedule':[{'seats':530,'starttime':'10:00','endtime':'10:45','date':'2011-11-24','location':'Auditorium'}],'description':'Qu\'est-ce que du “bon” ou du “mauvais” code? Qu\'est-ce qu\'une “bonne” ou une “mauvaise” conception ? Un “bon” ou un “mauvais” concepteur ? Doit-il obligatoirement utiliser UML, ou en tout cas une notation visuelle ? Une phase de conception est-elle indispensable ? Que faut-il attendre des outils d\'analyse automatique de la conception ? A toutes ces questions nous peinons à donner des réponses argumentées sur des bases concrètes, et nous enlisons dans des débats souvent stériles entre “c\'est Agile” et “ce n\'est pas Agile”. Par analogie au “neuromarketing” la “neuro-agilité” propose un autre angle de vision, qui vous apportera un regard différent sur les pratiques de conception que vous connaissez déjà et pourra vous inspirer des pistes prometteuses pour continuer à vous améliorer. Elle vous entraînera dans des recoins insoupçonnés de votre propre cerveau, équipement crucial à toute activité de programmation et pourtant si méconnu, si peu exploré dans notre discipline du “génie logiciel”.','name':'Neuro-agilité: un nouveau regard sur la conception','speakers':[{'id':1,'name':'Laurent Bossavit'}]};
session_data[2] = {'id':2,'schedule':[{'seats':110,'starttime':'10:00','endtime':'10:45','date':'2011-11-24','location':'Makalu'}],'description':'Les tests intégrés sont une arnaque, un virus qui s\'auto-réplique et qui menace d\'infecter votre code source, votre projet et votre équipe avec des promesses de douleur et de souffrance infinies. Mais comment éviter ces tests intégrés qui parcourent tout le système même si elles vérifient que des petits morceaux? Dans cette conférence, je vous propose une technique pour limiter le nombre de tests intégrés et éviter la “mort de la chaleur” qui vous attend si vous continuez avec vos tests intégrés. Version française (la meilleure possible) de la conférence “Integrated Tests Are A Scam” présentée partout dans le monde depuis 2009.Vous allez au moins savoir comment utiliser les objets dits “mock” de manière utile, et éviter les confusions qui habituellement arrivent lors de quelques semaines (ou mois) d\'expérience avec ces “mock”s. Aussi, vous allez apprendre une stratégie pour couvrir 99% de votre base de code avec des tests qui exécutent dans des dizaines de secondes, et non des heures.','name':'Les tests intégrés sont une arnaque!','speakers':[{'id':2,'name':'J. B. Rainsberger'}]};
session_data[3] = {'id':3,'schedule':[{'seats':50,'starttime':'10:00','endtime':'10:45','date':'2011-11-24','location':'Kilimandjaro 1-2'}],'description':'Venez écouter l’histoire d’une petite équipe qui a décidé de réaliser un jeu vidéo dans un environnement extrême où:l’équipe est nouvellement constituée, personne ne se connaît. la technologie est nouvelle pour tout le monde. les délais sont très courts (2 mois). le jeu n’est que très sommairement défini. Malgré tout, cette équipe avait un atout dans son sac : une certaine expérience des pratiques et des méthodes agiles.Quels sont les pièges dans lesquels nous sommes tombés ? Quelles pratiques ont éclairées notre chemin ? Quelle est l’issue du projet ?','name':'Alone in the dark','speakers':[{'id':3,'name':'Stéphane Hanser'}]};
session_data[4] = {'id':4,'schedule':[{'seats':50,'starttime':'10:00','endtime':'10:45','date':'2011-11-24','location':'Kilimandjaro 3-4'}],'description':'Dans le cadre d\'un projet stratégique et complexe pour lequel nous avions de fortes contraintes sur le délai et le périmètre, nous avons mis en place pas à pas la méthode Agile Scrum. Nous vous proposons de découvrir notre parcours, nos difficultés et nos succès après 10 mois de pratique de l\'Agilité et en particulier l\'effet catalyseur de motivation que cela a eu sur notre équipe de développement.Venez découvrir une expérience réussie d\'une mise en place rapide de la méthode Scrum. Nous présenterons en outre les pratiques d’intégration continue avancées mises en œuvre pour optimiser les développements.','name':'l\'Agilité ou comment doper l\'efficacité et la motivation des équipes','speakers':[{'id':4,'name':'Nicolas d\'Hennezel'}]};
session_data[5] = {'id':5,'schedule':[{'seats':75,'starttime':'10:00','endtime':'10:45','date':'2011-11-24','location':'Mont Blanc 1-2-3'}],'description':'Sans sens l\'adhésion à la technologie est aléatoire. Mais le sens ne suffit pas. Si les dysfonctionnements sont trop lourds, leurs couts passent au dessus du sens et se traduise par des résistances. L\'effissens rend moins aléatoire la justinovation, donne sa raison d\'être à l\'anticipaction…Venez découvrir des concepts précis et éprouvés, une autre manière de faire de la performance.','name':'Dépasser l\'efficacité pour être agile : la proposition de l\'effissens','speakers':[{'id':7,'name':'Karim Benameur'}]};
session_data[6] = {'id':6,'schedule':[{'seats':25,'starttime':'10:00','endtime':'10:45','date':'2011-11-24','location':'Mont Blanc 4'}],'description':'Soyez les acteurs principaux de cet atelier en construisant un backlog priorisé de questions à partir de la technique “Cercles et Questions” de Peter Block. Cela vous permettra d’extraire la quintessence de l’expérience Agile d’une petite équipe au sein d’une startup qui a su convaincre son management de l’intérêt à franchir le pas. Etes-vous prêt à relever le défi ?Venez:Découvrir comment une équipe de développeurs a mis en place l’agilité pour améliorer son fonctionnement.. Comprendre en quoi l’accompagnement aide une équipe à l’adoption de Scrum dans une. entreprise.Expérimenter une technique permettant de faire émerger les sujets les plus importants.','name':'Devenez le Product Owner de notre retour d’expérience','speakers':[{'id':8,'name':'Pierre Taillard'}]};
session_data[7] = {'id':7,'schedule':[{'seats':40,'starttime':'10:00','endtime':'10:45','date':'2011-11-24','location':'Cervin'}],'description':'Grace à votre maitrise des pratiques agiles, répondez aux besoins de l’entreprise “Wahou ?”C’est à travers différentes “épreuves” que nous échangerons sur les façons d’utiliser le cadre Scrum comme levier pour la performance des équipes. Nous espérons que ces échanges nourriront les plus curieux en leur donnant de nouveaux apprentissages sur le cadre Scrum, et permettront à certains de repartir avec d’autres questions en tête Endossez le rôle d’un ScrumMaster, d’un Product Owner, d’un Membre d’équipe ou bien du PDG, et relevez les multiples défis auxquels votre équipe fait face !Venez:Apprendre certaines choses sur le cadre de Scrum (rôles, réunions…). Vous poser des questions sur la façon d’utiliser Scrum. Echanger sur des situations concrètes grâce à nos retours d’expériences','name':'La session dont vous êtes le héros !','speakers':[{'id':11,'name':'Arnaud Benistant'}]};
session_data[8] = {'id':8,'schedule':[{'seats':40,'starttime':'10:00','endtime':'10:45','date':'2011-11-24','location':'Everest'}],'description':'Programmer est une tâche incroyablement ardue. Il faut faire preuve de discipline, assister semaine après semaine à un Dojo Développement, apprendre à dérouler ses katas les yeux fermés. Et le reste du temps surmonter la peur qui étreint à chaque nouvelle ligne de code : est-on sur le point d\'insérer un vilain bug dans un logiciel en production, qui pourrait coûter à son propriétaire plusieurs millions d\'euros ?Malgré tout et bien souvent, programmer est également une tâche jouissive. Et s\'il nous arrive souvent de le penser, nous le gardons généralement pour nous. Il est rare que nous codions juste pour le fun (comme disent nos cousins québecois), juste pour célébrer combien nous aimons notre vie de programmeur.Cette session tentera de changer cet état de fait. Nous allons coder pour le plaisir, avec le secret espoir que certains des participants aimerons ce qu\'ils verront, décideront que c\'est ce qu\'il y a de plus cool au monde, et chercheront à reproduire l\'expérience partout sur la planète.Cette session offre aux participants l\'occasiond\'apprendre comment coder un jeu vidéo ”“vintage””. de demander à des développeurs de faire des choses qu\'ils n\'auraient jamais osé faire eux-mêmes. de rencontrer d\'autres développeurs (qu\'ils soient ou non sortis du placard) et de célébrer un intérêt commun pour l\'acte de développement en tant que tel. rire un bon coup','name':'Un Kata Marrant','speakers':[{'id':13,'name':'Emmanuel Gaillot'}]};
session_data[9] = {'id':9,'schedule':[{'seats':530,'starttime':'11:10','endtime':'12:05','date':'2011-11-24','location':'Auditorium'}],'description':'L\'agilité est une approche radicalement différente des autres méthodes de développement pour le logiciel, mais néanmoins tout n\'est pas nouveau et certaines pratiques d\'apprentissage peuvent être réutilisées avec succès, en particulier tout ce qui concerne l\'apprentissage par le jeu.Lors de cette présentation, vous aurez l\'occasion :de mieux comprendre les leviers sur lesquels agit l\'apprentissage par le jeu,. de connaitre les principes pour créer un jeu qui marche,. de découvrir quelques jeux agiles parmi les plus populaires,. et éventuellement de pratiquer un jeu simple en équipe.','name':'Des Jeux Agiles pour apprendre','speakers':[{'id':15,'name':'Alexandre Boutin'}]};
session_data[10] = {'id':10,'schedule':[{'seats':110,'starttime':'11:10','endtime':'12:05','date':'2011-11-24','location':'Makalu'}],'description':'Nous souhaitons démontrer que l’approche BDD fonctionne et apporte une plus-value importante à des gros projets industriels avec une forte contrainte qualité. Nous allons montrer au cours d’une implémentation en direct notre activité quotidienne depuis 1 an, avec notre PO qui écrira une story et un scenario de test en langage ‘humain’, puis le développeur/testeur qui intègrera le scenario à notre logiciel et l’exécutera en interagissant avec un instrument. Au cours de cette présentation nous démystifierons l’écriture de tests fonctionnels et leur complexité de mise en place. Nous aborderons enfin les bénéfices vus sur notre cycle de développement et la qualité du logiciel.Les participants auront un retour concret sur notre expérience du BDD de plus d’un an. Ils pourront voir des exemples de code et aussi interagir avec les intervenants lors des questions réponses.','name':'Démonstration / Kata BDD sur un logiciel pilotant un instrument','speakers':[{'id':16,'name':'Matthieu Gironnet'}]};
session_data[11] = {'id':11,'schedule':[{'seats':50,'starttime':'11:10','endtime':'12:05','date':'2011-11-24','location':'Kilimandjaro 1-2'}],'description':'Le changement Agile commence souvent avec un fort accent sur les processus et pratiques de développement. Une fois que cet élément de la chaîne de valeur du produit global pour le développement est devenu optimisé, le goulot d’étranglement dans le système se déplace ailleurs. Habituellement, il se déplace au niveau de la direction des produits, avec comme challenge de fournir les conditions et le soutien pour garder une équipe agile se déplaçant à une vitesse supérieure.Afin de soutenir un changement plus important dans une organisation vers la méthodologie Agile, il est essentiel de se focaliser également sur les éléments préliminaires au développement, souvent appelée la «phase de découverte». Grâce à une combinaison d’organisation planifiée, de la découverte des besoin du produit et de cartographier les cas d’utilisation. La livraison par les équipes sera organisée pour travailler conformément au fonctionnalités attendues clairement définies et priorisées afin de parvenir à une valeur ajoutée maximale.Dans cette session, je parlerai des combats concernant l’Agile en R&D qui est souvent confronté aux limites de livraison et de découverte des besoins, et comment mettre en place une approche de «Product Management» agile qui étend à une échelle globale la valeur de l’Agile plus en profondeur dans l\'organisation. Je vais aussi parler d\'une combinaison d\'approches et de techniques que j\'utilise en tant que coach - spécifiquement le «Chartering» et «User Story Mapping».','name':'Cartographie agile de la gestion des produits','speakers':[{'id':18,'name':'Mack Adams'}]};
session_data[12] = {'id':12,'schedule':[{'seats':50,'starttime':'11:10','endtime':'12:05','date':'2011-11-24','location':'Kilimandjaro 3-4'}],'description':'Kanban est une approche de développement logiciel issue du Lean & Agile se différenciant des méthodes itératives et incrémentales, telles que Scrum, par son processus en flux tiré, ses cadences découplées et sa priorisation à la demande, mettant en application concrètement le Juste à Temps et la limite sur le travail en cours. Les enjeux du Kanban dépassent le cadre du projet pour aller plus naturellement vers la gestion de portefeuille et impliquer l’organisation. Lors de cette sessions, nous ferons un tour d\'horizon du Kanban.Venez découvrir le Kanban, ses enjeux et ses fondamentaux.','name':'Kanban, un tour d\'horizon','speakers':[{'id':19,'name':'Laurent Morisseau'}]};
session_data[13] = {'id':13,'schedule':[{'seats':75,'starttime':'11:10','endtime':'12:05','date':'2011-11-24','location':'Mont Blanc 1-2-3'}],'description':'Le risque est généralement abordé en entreprise selon des approches analytiques spécialisées. Le risque stratégique dédié à la Direction générale, la sécurité des systèmes d’information dédiée aux informaticiens, la gestion des risques encourus par les projets dédiée à leurs manageurs. Toutefois, la problématique de maîtrise des risques est complexe et mérite d’être envisagée de façon globale et systémique. La mise en sécurité de l’entreprise concerne l’ensemble du personnel et relève d’une mise en synergie des compétences dans une optique de détection précoce des sources de dangers et d’anticipation des scénarios de danger. L’agilité, dans son essence même, invite à renouveler l’approche du risque en en faisant un sujet beaucoup plus transversal et collectif. La diffusion de l’état d’esprit agile est une opportunité pour le renforcement de la sécurité globale au sein de l’entreprise.L’un des apports cruciaux des méthodes de développement agiles est la diminution importante des risques en mode projet. L’objet de cette contribution est de montrer aux participants que l’adoption de l’état d’esprit et des principes mis en œuvre par l’agilité permet d’aller au-delà de la mise en sécurité d’un projet particulier et que l’adoption d’une culture de l’agilité est de nature à renforcer la sécurité globale de l’entreprise.','name':'Agilité et approche systémique du risque','speakers':[{'id':20,'name':'Jacques Fleurat'}]};
session_data[14] = {'id':14,'schedule':[{'seats':25,'starttime':'11:10','endtime':'12:05','date':'2011-11-24','location':'Mont Blanc 4'}],'description':'In this interactive session we will explore the question, what are the enemies of self-determination and how can we as agile practitioners/scrum masters/program managers protect, support and grow self-determining teams?You will learn subtle methods of facilitating self-determining teams and the art of creating the environment that is most condusive to self-determining teams.','name':'It’s What You Don’t Do That Counts','speakers':[{'id':21,'name':'Susan Hunter'}]};
session_data[15] = {'id':15,'schedule':[{'seats':40,'starttime':'11:10','endtime':'12:05','date':'2011-11-24','location':'Cervin'}],'description':'Débat questions réponses sur l\'agilité organisé de façon agile. Les participants sont invités à proposer des sujets pour compléter le backlog initial défini par les animateurs et à définir collectivement les priorités. Les questions sont traitées dans l\'ordre ainsi défini. Après la réponse ils sont invités à dire si la réponse leur a apporté ce qu\'ils attendaient, pour considérer, ou pas, si le sujet (une “story”) est considéré comme fini. L\'organisation et le suivi de la session seront effectuées avec iceScrum, en mode ScrumBan. Les interactions avec l\'assistance se feront aussi avec des cartons rouges et verts. Quelques perturbations surviendront pendant la séance pour pimenter le déroulement et avoir une session rock\'n roll tout en illustrant des pratiques agiles. Le backlog initial contient des sujets autour de Scrum et de l’agilité.Venez:Avoir des réponses à leurs questions sur l\'agilité.. Contribuer en apportant des compléments aux réponses (tout le monde dans l\'assistance peut participer).. Comprendre la mécanique de Scrum.. Appréhender ce qu\'est le ScrumBan, avec l\'ajout de quelques pratiques Kanban dans Scrum.. Participer activement à l\'application de pratiques comme l\'ordonnancement d\'un backlog.. Voir, à travers iceScrum, ce que peut apporter un outil (open source).','name':'(ice)Scrum, agilité et rock\'n roll','speakers':[{'id':23,'name':'Claude Aubry'}]};
session_data[16] = {'id':16,'schedule':[{'seats':40,'starttime':'11:10','endtime':'12:05','date':'2011-11-24','location':'Everest'}],'description':'Si personne ne doute de l’intérêt des méthodes agiles pour garantir le succès d’un projet informatique, encore faut-il que les concepts qui les sous-tendent soient intégrés dans le contrat, dans des termes clairs et compréhensibles par le client : copilotage du projet, backlog, sprints, itérations, facturation par étapes, mécanismes de sorties du client en cours d’exécution,La contractualisation est souvent considérée comme un obstacle à une démarche Agile. Or, plus encore que pour un contrat de développement avec des méthodes classiques, il convient d’être vigilant quant à la rédaction des clauses contractuelles.La présentation aura pour objectif de sensibiliser les participants à la nécessité de contractualiser avec soin leurs relations avec leurs clients et de leur fournir des recommandations s’appuyant sur des cas pratiques tirés des expériences vécues avec des sociétés comme SOGILIS.','name':'La contractualisation d’un projet Agile : enjeux et pièges','speakers':[{'id':25,'name':'Jean-Philippe Leclere'}]};
session_data[17] = {'id':17,'schedule':[{'seats':530,'starttime':'14:45','endtime':'15:40','date':'2011-11-24','location':'Auditorium'}],'description':'Schneider Electric s\'est engagé depuis 2011 dans l\'adoption des méthodes Agiles au service du développement de ses offres de produits et de solutions. Venez découvrir comment une organisation Agile distribuée permet de soutenir le déploiement global et rapide des méthodes Agiles sur l’ensemble d’une entreprise internationale mettant en œuvre des projets multi-technologies. Le contexte de mise en œuvre de la transition Agile nous a conduits à mettre en place une dynamique basée sur l\'expérience des précurseurs et à collecter auprès des équipes projets impliquées des retours d\'expérience en temps réel.Les participants sont invités à partager les retours d\'expérience de l\'équipe Corporate de Schneider Electric en charge d\'animer la transition Agile de l’entreprise. Les enjeux, l\'envergure et les contraintes liées à un groupe international seront remis dans leurs contextes. Les bonnes pratiques et les principaux écueils rencontrés seront détaillés.Mots-clefs : Transition Agile, Organisation distribuée, cohabitation waterfall / Agile','name':'Agile Offer Creation program in Schneider Electric','speakers':[{'id':27,'name':'Hervé Dondey'}]};
session_data[18] = {'id':18,'schedule':[{'seats':110,'starttime':'14:45','endtime':'15:40','date':'2011-11-24','location':'Makalu'}],'description':'Le Mikado est une méthode d’ajout de fonctionnalité dans une application existante non prévue pour (legacy).Cette méthode maintient le code dans un état livrable, et par conséquent nous profitons d’un feedback intense à travers le compilateur, les tests et même les livraisons. Le résultat est entre autre une réduction des coûts. Elle permet aussi de focaliser les efforts en convergeant vers un but clair.Venez voir la méthode Mikado à l’œuvre et comprendre pourquoi elle s’appelle ainsi.Vous allez découvrir une méthode simple et léger qui vous permet de travailler dans du legacy avec :Une meilleur visibilité pour tout le monde.. Moins de bugs. Moins de stress. Tout en réduisant le WIP (Work In Progress). Et vous pourrez même l’essayer dès le lendemain!','name':'Maîtriser le legacy avec Mikado','speakers':[{'id':29,'name':'Johan Martinsson'}]};
session_data[19] = {'id':19,'schedule':[{'seats':50,'starttime':'14:45','endtime':'15:40','date':'2011-11-24','location':'Kilimandjaro 1-2'}],'description':'Régulièrement, les équipes agiles se heurtent à la Définition du Fini : on ne négocie pas sur la Qualité du produit. Mais qu\'en est-il de la Définition du Prêt ? à savoir, préparer correctement le contenu du Sprint à venir ? de la Release à venir ? de la Roadmap à venir ? Quel est l\'impact sur une Organisation apprenante en termes de gestion de portefeuille de projets ? De quels moyens dispose cette Entreprise agile pour “commencer” le voyage ? en quoi consiste la transition et comment s\'appuyer sur de nouvelles techniques d\'animation d\'ateliers ?Les participants trouveront ici des pistes pour améliorer la performance des équipes de développement, optimiser l\'alimentation des équipes avec des items déclarés “prêts” en se préparant dès les phases amonts de constitution du portefeuille de projets. Ce sera avec un grand intérêt que Fabrice récupérera et tiendra compte de vos différents feedbacks (Inspect & Adapt).','name':'Agile Portfolio','speakers':[{'id':31,'name':'Fabrice Aimetti'}]};
session_data[20] = {'id':20,'schedule':[{'seats':50,'starttime':'14:45','endtime':'15:40','date':'2011-11-24','location':'Kilimandjaro 3-4'}],'description':'Sur un projet Front End développé en Agile, le Product Owner protège les intérêts stratégiques tandis que le Team Leader représente la capacité technique et la vision des développeurs. Voici un nouvel acteur: le spécialiste de l’expérience utilisateur, qui représente les utilisateurs et consommateurs du produit, crée puis implémente la vision globale de leur expérience. Souvent un composite de praticien ergonome, designer d’interfaces et architecte de l’information, il dynamise la prise en considération de l’utilisateur par l’équipe et apporte des outils de décision qui permettent de réduire les inconnus et d’augmenter l’adéquation problème/solution. Comprendre son rôle, ses outils permet de maximiser son efficacité au sein de l’équipe globale, qu’il soude autour d’une cible commune: l’utilisateur et son expérience.Dans cette présentation, destinée à tous les praticiens Agile et/ou Lean, j’introduirai ce rôle encore sous-représenté en France et proposerai des modèles de collaboration efficace permettant que l\'expérience utilisateur demeure consistante et optimale au long des différentes itérations et livraisons. Je présenterai les techniques employées ainsi que les différents artéfacts qui peuvent être produits lors des phases stratégiques et de développement et en démontrerai les bénéfices pour les différents acteurs du projet. Enfin j’introduirai des propositions de validation des connaissances par tests utilisateurs gérables dans le cadre de sprints.','name':'L\'architecte de l’expérience utilisateur, un membre clé des projets front end Agile/Lean: présentation du rôle, conseils de collaboration.','speakers':[{'id':32,'name':'Sophie Freiermuth'}]};
session_data[21] = {'id':21,'schedule':[{'seats':75,'starttime':'14:45','endtime':'15:40','date':'2011-11-24','location':'Mont Blanc 1-2-3'}],'description':'Les histoires utilisateurs (ou user stories) sont au centre de la méthodologie Scrum. Ces histoires constituent la matière première de chaque itération. En première partie, la présentation portera sur l\'aspect qualititatif des histoires utilisateurs. Comment reconnaître une bonne histoire ? Comment améliorer leur qualité ? La deuxième partie de la présentation portera sur la planification des itérations (Sprints). Deux méthodes seront vues en détail : la planification par la vélocité (velocity planning) et la planification par la capacité (capacity planning).À la fin de la session, les auditeurs sauront exactement à quel moment il convient d\'appliquer l\'une ou l\'autre de ces méthodes dans leurs projets, et comment le faire. Finalement, un lien permettant de télécharger un outil pour réaliser un capacity planning efficacement sera offert.','name':'Une bonne histoire !','speakers':[{'id':33,'name':'Pierre Vachon'}]};
session_data[22] = {'id':22,'schedule':[{'seats':25,'starttime':'14:45','endtime':'15:40','date':'2011-11-24','location':'Mont Blanc 4'}],'description':'Vous avez tant bien que mal réussi à constituer un backlog produit, en impliquant (un peu) le client, il y a même quelques user stories dedans, et maintenant il va falloir commencer à développer. Mais bien sûr, impossible de prioriser… MoSCoW c’est bien, mais on ne fait que les Must alors ? Et deux ou trois Should si on a le temps ? Hummm… On fait autrement ? Des story maps par exemple ?Une heure pour vous expliquer ce que je fais avec cet outil, le mettre en oeuvre par petits groupes et échanger sur ce thème.Venez apprendre sur des exemples concrets à :identifier le plus court chemin menant à un produit livrable, et donc à des retours des utilisateurs. collaborer, faire participer tous les intervenants. mettre en oeuvre les techniques d’expression de besoin : user story, story map - les utiliser et les adapter','name':'Story Map : objectif feed-back !','speakers':[{'id':34,'name':'Thierry Vallée'}]};
session_data[23] = {'id':23,'schedule':[{'seats':40,'starttime':'14:45','endtime':'15:40','date':'2011-11-24','location':'Cervin'}],'description':'Avez-vous l\'impression qu\'une routine s\'est installée dans vos rétrospectives? Vous cherchez des idées pour les renouveler? A la clé de cette session : une formule de rétro “qui marche”, et plusieurs suggestions d\'activités “testées et approuvées”. De sprint en sprint, même s’il ressortait toujours des pistes d’amélioration intéressantes, le besoin d’apporter quelques changements au déroulement des rétrospectives s’est fait sentir. La lecture de « Agile Retrospectives » (E. Derby / D. Larsen, co-fondatrices avec N. Kerth du « Retrospective Facilitators Gathering » annuel), nous a donné envie d’en revoir la structure, et nous y avons également trouvé une mine d’idées d’activités pour chaque phase. Nous partagerons avec les participants notre expérience « Rétrospectives’lab » menée sur quelques sprints et avec plusieurs équipes de développement : les changements apportés en utilisant la structure proposée par E. Derby/D. Larsen et un retour d\'expérience sur les activités utilisées.Les participants gagneront ou approfondiront leurs connaissances sur la facilitation de rétrospectives (les étapes clés d\'une rétrospective). Ils trouveront également des idées d\'activités (via un retour d\'expérience) pour varier leurs rétrospectives.','name':'Rétrospectives’lab : décantation','speakers':[{'id':35,'name':'Emilie Franchomme'}]};
session_data[24] = {'id':24,'schedule':[{'seats':40,'starttime':'14:45','endtime':'15:40','date':'2011-11-24','location':'Everest'}],'description':'L’innovation est devenue le fer de lance des sociétés pour se démarquer et s’ouvrir de nouveaux marchés. Processus à part entière, elle peut avoir pour objectif la provocation d’une innovation de rupture. En nous positionnant dans le cadre défini par Hatchuel, Le Masson et Weil qui définissent les interactions entre Recherche, Innovation et Développement (RID), nous souhaitons démontrer que l’application de la méthode agile Scrum à ces trois processus permet d’avoir un cadre unifié et homogène qui facilite la gestion de ces trois domaines. Nous démontrons notamment la pertinence de cette approche dans le cas de la RID dans une SSII (Société de Service en Ingénierie Informatique).Les participants pourront voir l’application de Scrum dans un domaine innovant et plus élargi qu’un projet standard de développement. Ils pourront découvrir comment Scrum est appliqué dans ce domaine RID (Recherche, Innovation et Développement), permet d’unifier la gestion de projet, et de plus identifier les voies d’exploration possibles.','name':'Scrum et innovation','speakers':[{'id':36,'name':'Fabrice Bazzaro'}]};
session_data[25] = {'id':25,'schedule':[{'seats':530,'starttime':'16:45','endtime':'17:10','date':'2011-11-24','location':'Auditorium'}],'description':'Scrum n\'est pas la 42ème méthode de gestion de projets. Il y a des bases de gestion de projets traditionnelles. Il y a d\'autre bases pour la réalisation en mode Agile. Si vous êtes satisfait avec les méthodes traditionnelles, pourquoi en changer ? Si vous souhaitez des gains importants en passant dans un cadre Agile, oui, allez-y. Et si vous êtes décidés à tenter l\'aventure en sous-traitance, alors il y a quelque petites choses que vous devez savoir …Cette session n\'a pas pour but de donner des recettes de contrat ”“forfait Agile””. L\'objectif de cette session est d\'ouvrir un espace de réflexion sur l\'association Agilité et contrat et de faire bouger les lignes pour poser de nouvelles bases autorisant la performance Agile en sous-traitance.','name':'Ce que vous devez savoir à propos de la contractualisation Agile','speakers':[{'id':38,'name':'Jean-François Jagodzinski'}]};
session_data[26] = {'id':26,'schedule':[{'seats':110,'starttime':'16:45','endtime':'17:10','date':'2011-11-24','location':'Makalu'}],'description':'La gestion de configuration est un élément essentiel pour le développement d\'une application. Néanmoins, au quotidien cette pratique reste encore douloureuse. Une des causes est la maîtrise et les fonctionnalités proposées par l\'outil utilisé.Dans cette session technique, un groupe de développeurs vous invite à découvrir GIT (un gestionnaire de versions décentralisée) au travers de tranches de vie de développement. L\'objectif est de montrer l\'utilisation de GIT et son apport dans vos pratiques quotidiennes en terme de gestion de configuration. Cette session n\'a pas pour but de faire un comparatif avec SVN, Mercurial, Bazaar… et vous ne deviendrez pas un expert GIT à la fin de la présentation.Le souhait de cette session est triple : passer un bon moment, pratique en direct et être capable de mettre en pratique le lendemain dans son activité de développement.','name':'Git au quotidien','speakers':[{'id':39,'name':'Guillaume Gardais'}]};
session_data[27] = {'id':27,'schedule':[{'seats':50,'starttime':'16:45','endtime':'17:10','date':'2011-11-24','location':'Kilimandjaro 1-2'}],'description':'Agilité, Innovation Games©, World Café©, Fish Bowl, Holacratie© … La boîte à Outils a expérimenté de manière massive des processus innovants et variés, tant en matière de formation, de créativité et aussi de gouvernance d’entreprise. Former, responsabiliser, décloisonner, collaborer, générer de l’intelligence collective, créer de la valeur grâce à des femmes et de hommes heureux et motivés sont les fils conducteurs de ses expérimentations.Cette session sera un retour d’expérience des succès et aussi des difficultés rencontrées. Organisée sous la forme d’un Fish Bowl, vos questions et apports dynamiseront la session, vous choisirez le programme en testant diverse sorte de processus de sélection (il y aura des surprises).','name':'Comment rendre nos entreprises Agile ?','speakers':[{'id':41,'name':'Frédéric Dufau-Joël'}]};
session_data[28] = {'id':28,'schedule':[{'seats':50,'starttime':'16:45','endtime':'17:10','date':'2011-11-24','location':'Kilimandjaro 3-4'}],'description':'Il y a 6 mois… nous décidions de basculer un portefeuille de projets et TMA en agile… Freins, peurs, difficultés, changement (pour management, DP, CP, client PO, équipe…), contrats, reporting, MCO avec bugs imprévisibles et bloquants… Nous allons présenter les outils et pratiques agiles que nous avons mises en place progressivement dans une relation Front Office Back Office pour une équipe agile à distance.Accompagnement du changement / bascule agile (préparer, convaincre, anticiper, accompagner). Rex sur TMA en agile. Rex sur Portfolio agile. Rex sur agilité et travail à distance','name':'REX Bascule en agile d\'un portefeuille de projets et TMA','speakers':[{'id':42,'name':'Jean Dupuis'}]};
session_data[29] = {'id':29,'schedule':[{'seats':75,'starttime':'16:45','endtime':'17:10','date':'2011-11-24','location':'Mont Blanc 1-2-3'}],'description':'L\'agilité définit trois rôles importants : le Client, le Développeur, le Manager. Si les deux premiers rôles sont aujourd\'hui entrés dans le quotidien d\'une équipe agile, le Manager est bien souvent “hors circuit”. Pourtant, il joue un rôle clé en agilité. Cette présentation explique ce qu\'est un Manager agile.Venez découvrir comment:Mieux intégrer le Management dans la démarche agile. Rassurer les Managers qui perçoivent parfois le passage à l\'agilité comme une menace pour leur fonction. Planifier l\'accompagnement des Managers dans une approche agile.','name':'Manager agile : concrètement','speakers':[{'id':44,'name':'Thierry Cros'}]};
session_data[30] = {'id':30,'schedule':[{'seats':25,'starttime':'16:45','endtime':'17:10','date':'2011-11-24','location':'Mont Blanc 4'}],'description':'Une séance ludique d’entrainement à la simplicité, la communication et la collaboration. Vous choisirez votre programme de jeux inspirés des techniques d’entrainement à l’improvisation théâtrale avec « buy a Feature » (Innovation Games®). Le célèbre jeu « des chaises non musicales » primé à Boston grâce à Alex sera du programme, si c’est votre choix !Venez:Découvrir un processus de cohésion d’équipe Agile.. Développer ses qualités individuelles de confiance, d’écoute, d’énergie et de créativité pour nous aider à mieux collaborer et communiquer.','name':'Jouer pour être plus Agile','speakers':[{'id':45,'name':'Jérôme Cuttaz'}]};
session_data[31] = {'id':31,'schedule':[{'seats':40,'starttime':'16:45','endtime':'17:10','date':'2011-11-24','location':'Cervin'}],'description':'Sur la base de la proposition standard Scrum+XP (sur laquelle je ne reviens pas), je passe en revue ce que nous avons vu fonctionner ou échouer sur le terrain. Cela inclus un certain nombre de choses très concrètes sur la façon de mettre en pratique des propositions Scrum souvent peu détaillées, comme « il faut faire un backlog produit »','name':'Retour sur 4 ans d’industrialisation de l’agilité chez Orange','speakers':[{'id':48,'name':'Rémy Genin'}]};
session_data[32] = {'id':32,'schedule':[{'seats':40,'starttime':'16:45','endtime':'17:10','date':'2011-11-24','location':'Everest'}],'description':'Lorsque l\'agilité devient une “initiative Corporate”, qu\'un nouveau processus émerge, que des projets pilotes sont lancés, alors tout devient possible. . Lorsque le Product Owner a une vraie force pour faire avancer le projet, possède un budget confortable et une ambition gérable, quand il établit une vraie relation avec l\'équipe, alors le projet avance.. Lorsque le projet est coaché dès le départ, que les bons messages sont passés au client, que l\'équipe est formée et ouverte au changement, que le Scrum Master est expérimenté, alors tout le monde est motivé.. Bienvenue dans un projet pilote, bienvenue dans un projet rêvé ! . Nous verrons aussi que lorsque le rêve devient réalité, il se heurte à quelques difficultés ou résistances très terre à terre qu\'il nous faut surmonter !Bénéfices attendus pour les participants :Apprendre:. les bonnes pratiques à mettre en place au démarrage d\'un projet. comment définir un processus agile avec des personnes qui ne le sont pas (au départ). Voir : que beaucoup de choses sont possibles, qu\'il suffit parfois d\'oser. Comprendre : qu\'il faut parler, promouvoir, évangéliser, faire connaître, répéter, expliquer encore et toujours l\'agilité. Tous les jours et pour tout le monde.. Constater : qu\'il y a des réticences, les comprendre et essayer de les surmonter','name':'Y a t-il un pilote dans le projet ?','speakers':[{'id':49,'name':'Laurence Hanot'}]};
session_data[33] = {'id':33,'schedule':[{'seats':530,'starttime':'17:25','endtime':'18:20','date':'2011-11-24','location':'Auditorium'}],'description':'Nous proposons de présenter un retour d\'expérience sur le premier projet avionique externalisé ayant abouti à une satisfaction sur tous les points.En effet, le logiciel a été livré dans les délais et avec un niveau de qualité au delà des exigences du client. L\'intégration du livrable s\'est réalisée avec un minimum d\'effort. Grâce à l\'approche agile, ce projet fut aussi un succès d\'un point de vue humain chez le client comme chez le fournisseur. Il s\'est instauré une collaboration en confiance entre les acteurs du projet.Nous présentons également les problèmes liés à ce fonctionnement, ainsi que des possibilités d\'amélioration pour gagner en efficacité (ne pas lire productivité). Nous espérons ainsi donner des pistes pour changer l\'externalisation de projets logiciels.Les participants auront un retour d\'expérience réel, dans un contexte industriel particulièrement exigeant. De plus, l\'externalisation agile n\'est pas encore une pratique courante, surtout dans le monde de l\'avionique. Cette session constituera donc un exemple de collaboration réussie à travers des éléments concrets de valeur ajoutée, de transparence et de résolution de problèmes qui ont permis d\'aboutir au succès.Les professionnels, quant à eux, gagneront les moyens de réfléchir à une autre manière de collaborer avec leurs clients/fournisseurs pour que la confiance mutuelle et la satisfaction remplace la méfiance, les décisions défensives et les déceptions.La session laisse également une large part au dialogue avec les participants qui ont souvent beaucoup de questions dans le cas d\'un retour d\'expérience.','name':'Externalisation agile d\'un projet avionique : les ingrédients d\'un succès','speakers':[{'id':50,'name':'Etienne Zwiebel'}]};
session_data[34] = {'id':34,'schedule':[{'seats':110,'starttime':'17:25','endtime':'18:20','date':'2011-11-24','location':'Makalu'}],'description':'Avoir des millions d\'amis, comparer des millions d\'offres ou publier des millions de news sont autant d’exemples d’applications écrites en PHP. Ce langage de la “programmation pour les nuls”, qui permet tous les écarts, reste pourtant un choix privilégié pour les solutions web. Avec les bons outils et les bonnes pratiques, ce langage est modulable, testable et facilement livrable. Au travers d’une approche technique montrant par l’exemple quels instruments choisir, découvrez comment jouer la partition d’une symphonie pour PHP industrialisé en agilité majeure.Au programme:Dégager un boilerplate d’un projet PHP ou comment ne pas tout jeter à l’arrivée. Reprendre la main sur leur projet frontend et avoir une stratégie de refactoring par les tests. “Not only working software, but also well-crafted software” - Manifesto for Software Craftsmanship','name':'Symphonie pour PHP industrialisé en agilité majeure','speakers':[{'id':51,'name':'Jonathan Bonzy'}]};
session_data[35] = {'id':35,'schedule':[{'seats':50,'starttime':'17:25','endtime':'18:20','date':'2011-11-24','location':'Kilimandjaro 1-2'}],'description':'Depuis bientôt deux ans au sein du pôle technologies d\'Agence Interactive, nous assurons en mode Agile, pilotage, développement, déploiement et entretien de ce que nous produisons. Avec SCRUM, nous réalisons au forfait les dispositifs Web conçus dans le cadre de projets de communication digitale. Avec Kanban, nous assurons au quotidien les améliorations, le webmastering et la maintenance de tous les sites. Au travers de cette présentation, nous expliquerons comment l’utilisation conjointe de l’itératif et du lean sur les mêmes équipes nous a permis de concilier la gestion d’une activité de pôle de service et des réalisations en mode projet. Nous tenterons également par notre témoignage de vous faire partager un peu de ce fantastique chemin qu’est l\'adoption de l\'agilité.Les participants obtiendront:Une meilleure compréhension des challenges et des étapes d’un projet de conduite du changement vers l’agilité.. Le bénéfice d’un retour d’expérience sur l’utilisation conjointe de Kanban et SCRUM dans un backlog à 2 niveaux. (nos sprints sont des kanban). L’envie de passer d’une planification traditionnelle à une planification Agile.','name':'KANBAN et SCRUM au sein d\'une agence digitale','speakers':[{'id':54,'name':'Christophe Ney'}]};
session_data[36] = {'id':36,'schedule':[{'seats':50,'starttime':'17:25','endtime':'18:20','date':'2011-11-24','location':'Kilimandjaro 3-4'}],'description':'Un groupe de PO, pratiquant l’agilité depuis 6 ans, vous invite à partager leur évolutions ainsi que leur changement de vision du rôle de PO dans leur vie de tous les jours. Nous présenterons comment d’un PO marketing, nous avons évolué vers un PO embarqué dans l’équipe. Nous expliquerons les raisons et les facteurs de ces changements et notamment le principe Lean d’amélioration continue. Les principaux bénéfices de ces évolutions sont une bien meilleure adéquation entre les stories et les besoins de l’équipe, une validation du produit plus adaptée ainsi qu’une réduction des provisions et du travail inutile.Partage d\'experiences. Meilleur compréhension du rôle de PO. Acquisition de pistes pour adapter le rôle du PO dans leur structures','name':'Nos Product Owner (Pos), ils ressemblent à quoi aujourd’hui ?','speakers':[{'id':55,'name':'Isabelle Coelho'}]};
session_data[37] = {'id':37,'schedule':[{'seats':75,'starttime':'17:25','endtime':'18:20','date':'2011-11-24','location':'Mont Blanc 1-2-3'}],'description':'Devenir agile amène à développer de nouveaux comportements dans l\'acte de manager. Que cela signifiet-il concrêtement dans le domaine du management des Ressources Humaines. Je propose de reprendre les concepts de l\'agilité comportemental et d\'en traduire les fondamentaux en terme de Gestion des Ressources Humaines. Recruter, Former, Gérer les compétences (GPEC), Gérer les carrières, Rémunérer ou encore fixer des objectifs sont autant de thèmes qui seront redéfinis dans leurs enjeux et pratiques avec l\'approche agile.Cette session vous ermettra de comprendre en quoi les pratiques de GRH doivent évoluer. Comment permettre aux salariés de se sentir mieux dans les organisations lorsque la GRH devient agile. Pourquoi et comment ne pas reproduire les outils de management encore trop usité. Donner quelques clés simples de réflexion et d\'analyse permettant aux managers de se poser les “bonnes” questions avant d\'agir en GRH.','name':'Agilité et GRH','speakers':[{'id':59,'name':'Thomas Tarradas'}]};
session_data[38] = {'id':38,'schedule':[{'seats':25,'starttime':'17:25','endtime':'18:20','date':'2011-11-24','location':'Mont Blanc 4'}],'description':'Par analogie au “neuromarketing”, NeuroAgile désigne l\'intersection entre les approches agiles et les sciences qui étudient le cerveau et l\'esprit humain: des neurosciences à la psychologie sociale en passant par les sciences cognitives.Cet atelier invite les participants à explorer en petit groupes un certain nombre de ce qu\'on appelle les “biais cognitifs”, manifestations du support imparfait - le cerveau - qui abrite notre esprit aspirant à la rationalité. Des exercices permettent de toucher du doigt la réalité de ces phénomènes puis une phase de brainstorming a pour objectif de trouver des applications nouvelles à la réalité quotidienne des projets de développement: techniques expérimentales peut-être appelées à devenir de nouvelles pratiques Agiles?','name':'Atelier NeuroAgile','speakers':[{'id':60,'name':'Laurent Bossavit'}]};
session_data[39] = {'id':39,'schedule':[{'seats':40,'starttime':'17:25','endtime':'18:20','date':'2011-11-24','location':'Cervin'}],'description':'Les applications métiers ont souvent besoin d\'être adaptés au contexte de l\'entreprise qui les mets en œuvre. Rapidement, la maintenance de ces adaptations maisons coûtent cher, voire bloquent les évolutions. Comment une approche Agile peut nous aider à contourner ce problème. Agilité et Open Source sont les deux piliers de cette approche qui garantie au client la réduction des coûts de maintenances et le non fork.Cette session vous apportera:Une vision différente de la relation client fournisseur dans un relation complexe ou le client n\'est pas seulement consommateur d\'un service ou d\'un bien.. Mais aussi les opportunités d\'organisation différentes qu\'offrent l\'Agilité et le Libre (Open Source).','name':'L\'agilité support au co-développement','speakers':[{'id':61,'name':'Manuel Vacelet'}]};
session_data[40] = {'id':40,'schedule':[{'seats':40,'starttime':'17:25','endtime':'18:20','date':'2011-11-24','location':'Everest'}],'description':'Scrum ideals call for a team to be co-located, with members in close proximity to each other. However, the reality is that many businesses operate globally, and many teams already have a distributed component, with team members partially or permanently located apart from each other. Can this arrangement work, can these organizations still reap the benefits of operating with Scrum?Attendees will be exposed to experiences of successful implementation of Scrum with distributed teams.','name':'Overcoming Distances: Scrum with Distributed Teams','speakers':[{'id':62,'name':'Silvana Wasitova'}]};

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


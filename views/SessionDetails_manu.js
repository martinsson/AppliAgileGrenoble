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
		{'id':50,'schedule':[{'seats':450,'starttime':'08:00','endtime':'08:45','date':'AM','location':'Accueil'}],'description':'...','name':'Accueil autour d\'un caf�','speakers':[{'id':50,'name':'CARA'}]};

		session_data[5] =
		{'id':5,'schedule':[{'seats':450,'starttime':'08:45','endtime':'09:00','date':'AM','location':'Auditorium Pelvoux'}],'description':'...','name':'Le mot des organisateurs','speakers':[{'id':50,'name':'CARA'}]};

		
	session_data[1] =
		{'id':1,'schedule':[{'seats':450,'starttime':'9:00','endtime':'10:00','date':'2010-07-28','location':'Auditorium Pelvoux'}],'description':'Claude Aubry est l\'auteur du livre : �Scrum, le guide pratique de la m�thode agile la plus populaire�, premier livre sur Scrum en fran�ais, publi� aux �ditions Dunod en f�vrier 2010.','name':'Keynote Claude Aubry','speakers':[{'id':1,'name':'Claude Aubry'}]};

		session_data[2] = 
		{'id':2,'schedule':[{'seats':450,'starttime':'10:00','endtime':'11:00','date':'2010-07-29','location':'Auditorium Pelvoux'}],'description':'Although Agile, with its focus on lightweight methods and delivering, and CMMI, a business-process improvement model with a reputation for heavyweight methods and useless documentation, seem at odds with each other, it is possible to do both -� and do them seamlessly. Given the fact that marrying agile and CMMI is not done very often throughout the industry, this presentation relates a real-life experience of fusing these two disciplines and what it means for software development and ultimately the beneficiary of that software. Agile practitioners and managers who are considering CMMI will learn some basic principles for successfully implementing CMMI in an agile organization in an agile way. ','name':'Are Agile software-development philosophy and CMMI (Capability Maturity Model Integration) antithetical? A story of successful methodology merger','speakers':[{'id':2,'name':'Matthew Philip'}]} ;
		
		session_data[3] =
		{'id':3,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':'Belle-Etoile'}],'description':'Notre industrie du logiciel conna�t une crise qui remonte quasiment � sa naissance; cette �crise du logiciel� a �t� le pr�texte � fonder en 1968 une discipline d�sormais connue sous le nom de G�nie Logiciel. Bien que cette discipline constitue le socle p�dagogique de la formation, tout laisse penser que cette crise, loin d\'�tre r�solue, ne peut qu\'aller en s\'aggravant. Apparues il y a dix ans, les approches Agiles sont-elles susceptibles d\'avoir un plus grand impact? Cr�dit�es de quelques succ�s, elles sont aussi tr�s critiqu�es. Cet expos� accessible aux d�butants comme aux agilistes confirm�s, laissant une large part aux questions et r�ponses, offrira une occasion d\'aborder les questions de votre choix, sans aucun tabou ni faux-semblant. Les objectifs de cette pr�sentation sont de mieux comprendre ce qu\'on entend par � Agile �, et de repartir avec quelques pistes de pratiques nouvelles � essayer.','name':'Agile, dix ans apr�s: ce qui a chang�, ce qu\'il faut retenir','speakers':[{'id':3,'name':'Laurent Bossavit'}]} ;
		
		session_data[4] =
		{'id':4,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':'Chartreuse'}],'description':'Mieux comprendre le monde �conomique dans ses nouvelles caract�ristiques et mieux comprendre les nouvelles offres des entreprises pour mieux faire �voluer sa relation avec le client : prospective du contexte �conomique, caract�ristiques de l�offre globale agile, d�finition de la nouvelle relation client-fournisseur, comportements ad�quats. Les participants repartiront avec la conviction que l�agilit� n�est pas qu�une mode et que sa port�e va bien au-del� de la � programmation informatique �. Conf�rence d�ouverture des esprits.','name':'Offre agile pour survivre dans la jungle �conomique','speakers':[{'id':4,'name':'J�r�me Barrand'}]} ;			
		
		session_data[6] =
		{'id':6,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':'Sept-Laux 5'}],'description':'Venez voir comment Kelkoo a pass� 50% des �quipes au TDD et BDD en 10 mois! Pourquoi Kelkoo a choisi d�adopter l�Extreme Programming? Comment y faire adh�rer les �quipes? Quel temps a-t-il fallu pour maitriser le TDD? Pourquoi Pair-Programmer � plein temps? Quels sont les r�sultats? Quel impact sur les comp�tences de d�veloppement et sur la coh�sion d��quipe? Nous allons suivre le progr�s des �quipes mois par mois. Nous voulons t�moigner de ce virage complexe et partager les pratiques et les outils qui nous ont permis de faciliter l�adoption de l�Extreme Programming dans l�entreprise. Enfin, partagez vos propres difficult�s, inqui�tudes, questions et exp�riences! 20 minutes d�Open Space en petits groupes (plusieurs Kelkoo(s) seront l�). Le passage au XP d�mystifi� ! Les recettes de notre adoption (et nos erreurs) peuvent vous aider � r�ussir chez vous. Venez nouer des contacts pour une entraide dans la dur�e.','name':'Adoption d�Extreme Programming � Kelkoo','speakers':[{'id':6,'name':'Johan Martinsson'},{'id':7,'name':'Kevin Creix'},{'id':8,'name':'Jonathan Bonzy'}]} ;			
		
			session_data[7] =
		{'id':7,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':'Sept-Laux 4'}],'description':'Formation sur les User Stories et le sprint planning : Comment �crire les User Stories ? Quelles en sont les composantes-cl� ? Comment en juger la qualit� ? La m�thode de priorisation MoSCoW. Jumeler la m�thode avec les BVP (business value points) : m�thode de pr�diction des sprints. Introduction du Capacity Planning. Discussion sur le Capacity Planning et les Story Points. Les participants seront � m�me de mieux comprendre les concepts de User Stories et leur raisons d\'�tre, de mieux planifier et prioritiser les sprints, et d\'en pr�dire le risque.','name':'Je croyais tout savoir sur les User Stories !','speakers':[{'id':9,'name':'Pierre Vachon'}]} ;			
		
		session_data[8] =
		{'id':8,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':'Meije 3'}],'description':'Le r�le de Manager est difficile et la litt�rature regorge de conseils et autres pratiques pour �tre plus efficace dans cette activit�. Permettre � ses �quipes d�atteindre le niveau de performance attendu tout en maintenant un bon �tat d�esprit, une bonne ambiance et des individus motiv�s est un magnifique challenge. En ajoutant quelques pratiques Agile et Lean dans cet environnement performant, la potion devient r�ellement magique et l�efficacit� est vraiment au rendez-vous. Venez partager une exp�rience r�ussie � la SAMSE et discuter en face-�-face avec Fr�d�ric sur la mani�re dont il manage des �quipes agiles.','name':'Management et Agilit� : une potion magique','speakers':[{'id':10,'name':'Frederic Dufau-Joel'},{'id':11,'name':'Alexandre Boutin'}]} ;			


		session_data[9] =
		{'id':9,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':'Meije 2'}],'description':'Je me perds dans les diff�rentes versions de librairies,</br>Je n�ai pas le temps de relancer tous les tests � chaque modification du code,</br>�a marche chez moi mais pas sur la machine de Laurent,</br>Je n�ai pas le temps de mettre en place une plateforme d\'int�gration continue,</br>Je passe trop de temps � int�grer les travails des autres membres de l��quipe,</br>Si les tests ne passent plus c\'est � cause de mes modifications ou parce que je vient de r�cup�rer le code de Laurent� pourtant il va bien falloir que les d�veloppements de toute l\'�quipe s\'int�grent bien � chaque commit. Venez trouver des r�ponses � ces questions en participant � un atelier.Les participants repartiront avec des techniques pour maitriser les �tapes de build et seront convaincus que ma�triser leur build am�liore l�efficacit� de l��quipe.','name':'Build et Int�gration Continue','speakers':[{'id':12,'name':'Emmanuel Hugonnet'},{'id':13,'name':'Guillaume Karcher'},{'id':14,'name':'Laurent Tardif'},{'id':15,'name':'Laurent Vaills'}]} ;			


		
		session_data[10] =
		{'id':10,'schedule':[{'seats':200,'starttime':'11:10','endtime':'12:40','date':'2010-07-30','location':'Auditorium Pelvoux'}],'description':'Un quatuor n\'a pas de chef d\'orchestre, c\'est une �quipe qui s\'auto organise, et qui parvient � l\'excellence.<br/>Comment conjuguer projet collectif et expression individuelle ?<br/>Cr�ativit� individuelle et interd�pendance ?<br/>Quelle dynamique pour animer un groupe ?<br/>Comment susciter l��motion et l�adh�sion?<br/>Comment faire face � l�impr�visible et s�adapter aux �volutions ?<br/>Autant d�interrogations qui, avec l�aide de la m�taphore musicale, stimulent la sensibilit� et l�esprit.La force du quatuor Annesci est de cr�er une interaction avec les participants : mises en situation, direction d�orchestre, s�quences musicales�, une le�on ludique de management� Agile ?','name':'L\'Equipe auto-organis�e','speakers':[{'id':16,'name':'Quatuor Annesci'}]} ;			
		
		
		session_data[11] =
		{'id':11,'schedule':[{'seats':200,'starttime':'11:10','endtime':'12:10','date':'2010-07-30','location':'Belle-Etoile'}],'description':'Il y a quelques temps, un nouveau mot faisait son apparition dans le monde du d�veloppement logiciel : Kanban. Qu�est-ce ? Est-ce bien ? Est-ce simple � mettre en �uvre ? Cela remplace-t-il Scrum ? Cela fonctionne-t-il r�ellement ? C�est � toutes ces questions que nous nous proposons de r�pondre en nous appuyant sur nos retours � en direct des tranch�es � de nos projets agiles� Les participants partiront avec un retour d�exp�rience sur le d�ploiement et l�utilisation de Kanban pour le d�veloppement logiciel. Quels sont les b�n�fices, les pi�ges � �viter, les recommandations, les questions en suspens�','name':'Kanban depuis les tranch�es','speakers':[{'id':17,'name':'Herv� Lourdin'},{'id':18,'name':'Cyril Megard'}]} ;			

				session_data[12] =
		{'id':12,'schedule':[{'seats':200,'starttime':'11:10','endtime':'12:10','date':'2010-07-30','location':'Chartreuse'}],'description':'Les syst�mes industriels produisent des biens mat�riels destin�s � des clients pour satisfaire leurs besoins (d\'�quipement).Un syst�me d\'information produit des informations destin�es � des clients pour satisfaire leurs besoins (de d�cision). Cette analogie simple ouvre des perspectives vertigineuses d�s lors qu\'on la pousse dans ses retranchements et que l\'on se focalise sur les vraies caract�ristiques du besoin de d�cision des clients. Elle fait voler en �clat la fa�on dont on aborde traditionnellement le SI dans les organisations et trace de nouvelles voies pour la relation DSI/utilisateurs de demain (de la contractualisation � la mesure de performance). Les plus formidables gisements de performance r�sident ici et ne sont que trop rarement explor�s/exploit�s. Nous allons donc voir dans quelle mesure le syst�me d\'information peut �tre con�u et g�r� avec l\'obsession de ses clients, les d�cideurs strat�giques, tactiques et op�rationnels pour d�finitivement basculer de l\'administration diff�r�e des ressources au pilotage temps-r�el de la performance et ainsi tendre vers l\'entreprise agile. L\'agilit� apparaissant comme la parfaite symbiose entre les nouveaux principes de management (Lean, Six Sigma) et les nouvelles possibilit�s offertes par les technologies de l\'information. Dans ce nouveau paradigme, chaque nouvelle ligne de code, chaque nouvelle brique logicielle, chaque nouveau param�trage doit �tre pens� avec l\'obsession de la performance, de la synchronisation, de l\'analyse et de l\'am�lioration continue. Les participants repartiront avec une nouvelle vision et une remise en question profonde de la fa�on dont ils abordaient la mission de la DSI jusqu\'� lors! L\'action qui en d�coulera sera par exemple de repenser fondamentalement (ou de mettre en place�) la relation DSI-utilisateurs d\'informations ainsi que ses indicateurs de performance, et au final de peut-�tre m�me repenser le SI de la DSI!�','name':'Vers la Production Agile d\'Informations','speakers':[{'id':19,'name':'Jos� Gramdi'}]} ;			
		
		session_data[13] =
		{'id':13,'schedule':[{'seats':200,'starttime':'11:10','endtime':'12:10','date':'2010-07-30','location':'Sept-Laux 5'}],'description':'L\'atelier �story map� formalis� par Jeff Patton est un atelier qui permet de cr�er collectivement le product backlog � partir de la vision de ce que l\'on veut r�aliser. Dans les contextes de transition vers l\'agile c\'est un atelier clef qui arrive souvent � un moment o� les participants n\'ont pas encore commenc� � travailler ensemble, ne sont pas peut �tre pas encore familier avec l\'agile, et cela pour construire collectivement la liste des fonctionnalit�s � r�aliser. Cette session sera compos�e d\'une partie de mise en pratique de cet atelier et d\'une partie d\'�change et de retours d\'exp�rience sur ses facteurs clefs de succ�s. Les participants auront l\occasion d\'exp�rimenter l\'atelier story map et d\'�changer avec des praticiens exp�riment�s sur ses facteurs clefs de r�ussite.','name':'Atelier Story Map, l� o� tout commence...','speakers':[{'id':20,'name':'Olivier Pizzato'},{'id':21,'name':'Emmanuel Etasse'}]} ;			
		
		session_data[14] =
		{'id':14,'schedule':[{'seats':200,'starttime':'11:10','endtime':'12:10','date':'2010-07-30','location':'Sept-Laux 4'}],'description':'En 2009 le CRIH des Alpes, d�cide de dynamiser et d�am�liorer ses d�veloppements logiciels en apportant de l�agilit� dans ses projets. Le choix se porte sur Scrum et sur l�approche Test Driven Development. Un premier projet, ePatient � Prise de rendez-vous par internet, est d�marr� en novembre 2009 avec le soutien d�Osiatis Ing�nierie, SSII retenue sur ce march�. Un an apr�s le d�marrage et deux mois apr�s le d�ploiement en production, venez b�n�ficier du retour d�exp�rience de l��quipe sur la m�thode et les outils d�int�gration continue. Cette pr�sentation vous permettra de ressentir comment aborder au mieux la m�thode Scrum dans vos projets, ou d�am�liorer votre pratique en tirant profit de l�exp�rience d�un projet men� sur pr�s d�un an.','name':'ePatient � Le CHU de Grenoble adopte la m�thode SCRUM pour conduire ce projet','speakers':[{'id':22,'name':'Cathy Descombes'},{'id':23,'name':'Fran�ois Talbot'},{'id':24,'name':'Lo�c Faure'}]} ;			
		
		session_data[15] =
		{'id':15,'schedule':[{'seats':200,'starttime':'11:10','endtime':'12:10','date':'2010-07-30','location':'Meije 3'}],'description':'Les m�thodes agiles mettent au placard de nombreuses m�thodes de projet dont les d�fauts (lourdeur, incompr�hension des attentes finales, manque de priorit�s) ont marqu� de leur empreinte l\'�chec ou le demi-succ�s des projets. Longtemps associ� � cette image, le �Processus Unifi� s\'accorde pourtant avec le manifeste agile et compl�te les m�thodes connues comme Scrum ou XP sur les moyens et gros projets. Cette session vous propose de parcourir d�autres interpr�tations et applications du �Processus Unifi� � travers ses diff�rentes versions simplifi�es et agiles : Agile Unified Process, Open UP et EssUP. B�n�fices attendus pour les participants :</br>Comprendre comment orchester diff�rentes m�thodes agiles dans un seul et m�me processus</br>Comprendre les diff�rentes phases du �Processus Unifi� et leurs objectifs</br>Orchestrer des disciplines projets � travers les phases du �Processus Unifi� toujours en agile</br>Comprendre les r�les et les artefacts essentiels, minimum et suffisants','name':'Enrichir ses m�thodes avec des �Processus Unifi�s� agiles','speakers':[{'id':25,'name':'Romain Couturier'}]} ;			
		
	
	session_data[16] =
		{'id':16,'schedule':[{'seats':200,'starttime':'10:00','endtime':'11:00','date':'2010-07-30','location':'Meije 2'}],'description':'Je ne ma�trise pas ma proc�dure d\'installation<br/>J\'appr�hende chaque d�ploiement car c\'est long et compliqu�<br/>Je ne sais pas � quelle version de mon code correspondent mes binaires en production,<br/>Je ne sais pas exactement ce que contient mon application,<br/>Je ne fais pas valider ma proc�dure d\'installation par la QA<br/> � et pourtant je dois bien livrer de nouvelles fonctionnalit�s r�guli�rement.<br/> Venez nous rejoindre pour r�pondre � ces questions en participant � un atelier. Les participants repartiront avec des techniques pour ma�triser le d�ploiement, et seront convaincus que ma�triser et automatiser le d�ploiement am�liore la qualit� logicielle et l�efficacit� de l��quipe.','name':'D�ploiement et configuration automatique d�application','speakers':[{'id':26,'name':'Nicolas Capponi'},{'id':14,'name':'Laurent Tardif'},{'id':27,'name':'Alain Delafosse'}]} ;			
		
		session_data[88] =
		{'id':88,'schedule':[{'seats':200,'starttime':'12:10','endtime':'13:30','date':'2010-07-30','location':'Hall'}],'description':'...','name':'D�jeuner','speakers':[{'id':50,'name':'CARA'}]} ;			
		
		session_data[17] =
		{'id':17,'schedule':[{'seats':200,'starttime':'13:30','endtime':'14:30','date':'2010-07-30','location':'Auditorium Pelvoux'}],'description':'Aslak travaille avec des �quipes agiles depuis 2003 et a contribu� � plus d\'une douzaine de projets Open Source, et r�cemment plus particuli�rement sur Cucumber (http://cukes.info), un framework tr�s populaire bas� sur Ruby pour le BDD (Behaviour Driven Development)','name':'Keynote Aslak Hellesoy','speakers':[{'id':41,'name':'Aslak Hellesoy'}]} ;			
		
		session_data[18] =
		{'id':18,'schedule':[{'seats':200,'starttime':'14:30','endtime':'15:30','date':'2010-07-30','location':'Auditorium Pelvoux'}],'description':'Une des premi�res difficult�s pour adopter les m�thodes agiles est de passer du cycle en cascade au cycle it�ratif. En utilisant une analogie simple avec � l�automatique � je vais faire �merger les tenants et aboutissants de la production de logiciel industriel. D�duire de cette approche les b�n�fices du cycle it�ratif et incr�mental pour le d�veloppement logiciel. Monter � cette occasion, en utilisant une autre analogie avec � l�artisanat �, que les m�triques � internes � pour mesurer l�avancement et/ou la productivit� en d�veloppement ne sont pas pertinentes. Vous serez convaincus (et aurez des arguments pour convaincre), que le cycle it�ratif et incr�mental est un bon moyen pour ma�triser un d�veloppement logiciel. Vous serez convaincus (et aurez des arguments pour convaincre), que le � nombre de lignes de code source / heure � ne devrait plus �tre utilis� pour piloter un d�veloppement !','name':'La machine � produire du logiciel','speakers':[{'id':28,'name':'Fran�ois Brun'}]} ;			
		
		session_data[19] =
		{'id':19,'schedule':[{'seats':200,'starttime':'14:30','endtime':'15:30','date':'2010-07-30','location':'Belle-Etoile'}],'description':'D�couvrez comment une �quipe de d�veloppement IBM, � l\'aide de Rational Team Concert, vit sa transformation en adoptant une d�marche agile. Mais les m�thodes agile peuvent �tre fragile, aussi ce retour d�exp�rience permettra de comprendre comment renforcer, au quotidien, la collaboration entre les d�veloppeurs et �galement partager les comp�tences et � rendre plus agile l\'ensemble du processus de d�veloppement. Venez pour mieux appr�hender les m�thodes de d�veloppement agile pour gagner en qualit� et efficacit�.','name':'Agility@Scale en pratique','speakers':[{'id':29,'name':'Jean-Yves Rigolet'}]} ;			
		
		session_data[20] =
		{'id':20,'schedule':[{'seats':200,'starttime':'14:30','endtime':'15:30','date':'2010-07-30','location':'Chartreuse'}],'description':'Dans les organisations il existe plusieurs niveaux de maturit� en gestion de portefeuille de projets. Au niveau le plus bas la gestion se r�duit � une simple liste des projets en cours. Au niveau de maturit� le plus �lev� un processus lourd de priorisation est mis en place mais son retour sur investissement est loin d��tre satisfaisant. Et si l\'agilit� nous ouvrait de nouvelles perspectives ? Quel serait alors le mod�le de portfolio management � mettre en oeuvre pour permettre le d�veloppement prioritaire de toutes les fonctions � tr�s haute valeur ajout�e pour l�organisation (quel que soit le projet) ? Les participants repartiront avec une vision nouvelle sur les impacts positifs du basculement des projets en mode Agile au niveau de l�organisation du SI de l�entreprise.','name':'L�Agilit� au niveau du portfolio','speakers':[{'id':30,'name':'Jean Dupuis'},{'id':31,'name':'Jean-Francois Jagodzinski'}]} ;			
		
		session_data[21] =
		{'id':21,'schedule':[{'seats':200,'starttime':'14:30','endtime':'15:30','date':'2010-07-30','location':'Sept-Laux 5'}],'description':'Au cours de cette session, nous avons choisi de vous pr�senter l�arriv�e d�un nouveau membre dans notre �quipe : le Kanban. Au travers de notre environnement m�tier et de notre exp�rience, nous vous exposerons de mani�re ludique et interactive les mutations qu�il a subit pour repr�senter notre r�alit�. Pour autant, m�me si le Kanban s�adapte � nos besoins, il ne r�sout pas tous les probl�mes. C�est pour cela que nous �changerons aussi avec vous sur la fa�on dont nous nous sommes adapt�s au Kanban.','name':'Le Kanban de la naissance � la vie','speakers':[{'id':32,'name':'C�dric Joseph'},{'id':33,'name':'Vincent Lesne'},{'id':34,'name':'Maxime Ducros'}]} ;			
		
		session_data[22] =
		{'id':22,'schedule':[{'seats':200,'starttime':'14:30','endtime':'15:30','date':'2010-07-30','location':'Sept-Laux 4'}],'description':'Des pressions externes grandissantes poussent les entreprises � changer leurs organisations pour s\'adapter et d�velopper la r�activit�. Les SI, eux aussi sont impact�s. L\'agilit� devient une alternative pertinente pour acc�l�rer la mise en oeuvre de produits et s�curiser les d�veloppements. Premier challenge : d�finir l\'organisation agile adapt�e au contexte de votre entreprise. Mais au-del�, la r�elle complexit� r�side dans l\'implication des hommes � tous les �chelons. L\'�volution des habitudes de travail doit �tre coupl�e � l\'�volution des habitudes de conception des solutions informatiques. Nous vous proposons un premier cadre de r�flexion sur la transition organisationnelle n�cessaire au d�ploiement de l\'agilit�. B�n�fices attendus pour les participants:<br/>Comprendre les enjeux, les objectifs et les contraintes d�une transition vers l�agilit�<br/>Avoir quelques pistes pour d�marrer une transition efficace<br/>Dessiner sa propre strat�gie � partir de cas concrets','name':'Transition agile & Accompagnement au changement','speakers':[{'id':35,'name':'G�raldine Gustin'},{'id':25,'name':'Romain Couturier'}]} ;			
		
		session_data[23] =
		{'id':23,'schedule':[{'seats':200,'starttime':'14:30','endtime':'15:30','date':'2010-07-30','location':'Meije 2'}],'description':'Nous proposons dans cette session de d�crire une nouvelle approche que nous appelons BDM (Behaviour Driven Metrics) ou �tablissement de m�triques pilot�e par le comportement. Selon les auteurs de � The Balanced Scorecard �, Robert S. Kaplan et David P. Norton, 1996, � Vous obtenez ce que vous mesurez �, il nous faut des objectifs pour avancer mais nous avons �galement une tentation bien humaine � n�en faire que le juste n�cessaire. Lors de cette session vous d�couvrirez une approche bas�e sur le comportement pour �valuer des m�triques agiles et vous serez �galement sollicit�s en petits groupes pour appliquer cette approche sur des cas concrets que vous proposerez. B�n�fices attendus pour les participants : <br/>D�couvrir et pratiquer l�approche agile BDM<br/>Disposer d�un r�el outil pour �valuer l�utilit� d�une m�trique d�un point de vue<br/>comportemental.<br/>Prendre du plaisir � travailler et discuter en petits groupes auto-g�r�s.','name':'Behaviour Driven Metrics : M�me les chiffres peuvent �tre agiles!','speakers':[{'id':11,'name':'Alexandre Boutin'},{'id':21,'name':'Emmanuel Etasse'}]} ;			
		
		session_data[24] =
		{'id':24,'schedule':[{'seats':200,'starttime':'14:30','endtime':'15:30','date':'2010-07-30','location':'Meije 3'}],'description':'Je ne comprends pas le comportement du code,<br/>Je n\'arrive pas � le faire �voluer,<br/>J\'ai pas de garantie de non-r�gression,<br/>J\'ai du mal � le tester,<br/>� et pourtant il va bien falloir ajouter des fonctionnalit�s. Venez assister � la correction d\'un bug et l\'ajout d\'une fonctionnalit� dans un logiciel non test� en utilisant les techniques de TDD dans du legacy code. Les participants repartiront avec des techniques pour travailler avec du code non test�, et seront convaincus que le TDD dans du legacy code est possible et efficace.','name':'TDD et Legacy','speakers':[{'id':36,'name':'Bernard Huguet'},{'id':37,'name':'Luc Jeanniard'},{'id':6,'name':'Johan Martinsson'}]} ;			
		
		session_data[55] =
		{'id':55,'schedule':[{'seats':200,'starttime':'15:30','endtime':'16:00','date':'2010-07-30','location':'Hall'}],'description':'...','name':'Pause Caf�','speakers':[{'id':50,'name':'CARA'}]} ;			
		
		session_data[25] =
		{'id':25,'schedule':[{'seats':200,'starttime':'16:00','endtime':'17:00','date':'2010-07-30','location':'Auditorium Pelvoux'}],'description':'Retour d\'exp�rience des pratiques de tests Agile chez un �diteur de logiciels financiers. Apr�s 18 mois d\'activit� de test dans un contexte Scrum/XP, les testeurs ont enregistr� un certain nombre succ�s directement dus aux nouvelles pratiques et ont rencontr�s aussi quelques difficult�s qui ont men� � des adaptations des m�thodes. Cette pr�sentation se veut un bilan des tests Agile th�oriques confront�s � la r�alit� d\'une application complexe. Le participant pourra voir, sur la base d\'un exemple r�el, les succ�s, difficult�s et adaptations possibles des pratiques de tests Agile.','name':'Agile Testing en pratique','speakers':[{'id':39,'name':'Laurent Bristiel'},{'id':40,'name':'Fabien Maquet'}]} ;	
		
		session_data[26] =
		{'id':26,'schedule':[{'seats':200,'starttime':'16:00','endtime':'17:00','date':'2010-07-30','location':'Belle-Etoile'}],'description':'Comparaison de deux projets en d�marche SCRUM r�alis�s par une SSII<br/>Un projet avec une �quipe pr�sente chez le client<br/>Un projet avec une �quipe distribu�e sur plusieurs sites<br/>Identifier les points communs et les diff�rences sur l�organisation et le d�roulement de deux projets en d�marche SCRUM.<br/>B�n�fices attendus pour les participants :<br/>Pouvoir identifier les probl�mes rencontr�s sur des projets en d�marche SCRUM en fonction de l�organisation de l��quipe et de l�analyse des r�trospectives.<br/>Identifier si possible les gains et/ou les d�perditions de productivit� d�une �quipe externalis�e face � une �quipe chez le client','name':'Comparaison de deux projets en d�marche SCRUM r�alis�s par une SSII','speakers':[{'id':41,'name':'Pierre Capiomont '},{'id':42,'name':'C�dric Caillet'}]} ;	
		
		session_data[27] =
		{'id':27,'schedule':[{'seats':200,'starttime':'16:00','endtime':'17:00','date':'2010-07-30','location':'Chartreuse'}],'description':'Agile methods have been the most talked topic of this millenium in product development. In this talk I view embedded Agile from practical point of view. I will go through how values, principles and even techniques of Agile software development can be adapted to development that has dependencies outside software development. The presentation will help audience to realize how different practices support each other and how agile development affects also the rest of the organization. Real world stories from 7 year journey in different roles with embedded Agile are used to illustrate the challenges and possible solutions. Audience will gain knowledge on several areas in embedded development: automated testing and continuous integration, incremental co-design, ISO9001, long test agency processes, customer role, etc�','name':'Embedded Agile','speakers':[{'id':43,'name':'Timo Punkka'}]} ;	
		
		session_data[28] =
		{'id':28,'schedule':[{'seats':200,'starttime':'16:00','endtime':'17:00','date':'2010-07-30','location':'Sept-Laux 5'}],'description':'Venez jouer � un jeu de simulation d�un Casino � l�aide d�un kanban et voir par une technique imparable comment am�liorer le flux de production d�une �quipe en limitant son WIP (Work In Progress). Venez prendre conscience de l�int�r�t du kanban et de limiter les t�ches qui s�empilent dans un flux de production.','name':'Casino Game - Venez d�couvrir comment limiter votre TAF !','speakers':[{'id':44,'name':'Laurence Hanot'}]} ;	
		
		session_data[29] =
		{'id':29,'schedule':[{'seats':200,'starttime':'16:00','endtime':'17:00','date':'2010-07-30','location':'Sept-Laux 4'}],'description':'Fin 2009, nous lancions pour GL events, groupe leader dans le secteur l\'�v�nementiel, un projet d\' � usine � site Web � en management agile SCRUM. Il y a quelques mois, se tenait la revue du dernier sprint, d_\'un projet ayant donn� naissance � une solution innovante, pertinente et efficiente au regard de la strat�gie Web retenue par GL events. Dans ce retour d\'exp�rience, nous t�moignerons des raisons qui nous ont conduit au choix de l\'agilit� et de SCRUM, pr�senterons les outils agiles que nous avons mis en place, discuterons des challenges que nous avons relev�s et enfin des le�ons que nous en avons tir�es. B�n�fices attendus pour les participants:<br/>Faire connaitre les b�n�fices de l\'agilit� sur 3 volets; la conduite de projets strat�giques; la qualit� de la relation client-fournisseur, la libert� d\'innovation sur des projets au forfait.','name':'L\'Agilit�, clef du succ�s de notre projet?','speakers':[{'id':45,'name':'C�dric Chabry'},{'id':46,'name':'Denis Tomasicchio'},{'id':47,'name':'Christophe Ney'}]} ;	
		
		session_data[30] =
		{'id':30,'schedule':[{'seats':200,'starttime':'16:00','endtime':'17:00','date':'2010-07-30','location':'Meije 3'}],'description':'La documentation est une question r�currente des organisations qui d�couvrent le mode de fonctionnement agile pour les projets. Les bases du manifeste Agile �un logiciel op�rationnel plut�t qu`\'une documentation exhaustive� ainsi que le fait de privil�gier l\'accueil du changement perturbent la logique actuelle dont les fondations reposent avant tout sur la documentation. Le but de cette pr�sentation est de r�pondre aux interrogations que suscite la logique Agile. La documentation ne dispara�t pas, c\'est son r�le qui change. Sa forme, son contenu, son mode de production s\'en trouvent affect�s. En modifiant son point d\'observation les choses deviennent plus claires. Les participants auront des �l�ments qui les aideront � s�orienter vers des solutions pouvant r�pondre � leur pr�occupation.','name':'Documentation et Agilit�','speakers':[{'id':31,'name':'Jean-Francois Jagodzinski'}]} ;	
		
		session_data[31] =
		{'id':31,'schedule':[{'seats':200,'starttime':'16:00','endtime':'17:00','date':'2010-07-30','location':'Meije 2'}],'description':'Haskell est un langage de programmation fonctionnelle qui retient de plus en plus l\'attention des d�veloppeurs agiles, par son niveau d\'abstraction, son �l�gance et sa concision. Il s\'appuie cependant sur un paradigme radicalement diff�rent de la construction logicielle orient�e objet, et peut rebuter par sa diff�rence avec des langages plus classiques comme Java. Cette session propose de pr�senter quelques aspects de Haskell par l\'exemple, au travers de la programmation compl�te en TDD d\'un exercice inspir� du jeu Robozzle. L\'intention de l\'orateur est de donner envie � l\'assistance de d�couvrir davantage Haskell et les concepts de programmation qui lui sont associ�s. Venez d�couvrir Haskell et voir comment on peut l\'utiliser pour impl�menter une fonctionnalit� non triviale et apprendre par l\'exemple comment utiliser TDD avec un langage fonctionnel','name':'Kata Robozzle en Haskell','speakers':[{'id':48,'name':'Emmanuel Gaillot'}]} ;	
		
		
		
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


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
session_data[1] = {'id':1,'schedule':[{'seats':530,'starttime':'10:00','endtime':'10:45','date':'2011-11-24','location':'Auditorium'}],'description':'Qu\'est-ce que du �bon� ou du �mauvais� code? Qu\'est-ce qu\'une �bonne� ou une �mauvaise� conception ? Un �bon� ou un �mauvais� concepteur ? Doit-il obligatoirement utiliser UML, ou en tout cas une notation visuelle ? Une phase de conception est-elle indispensable ? Que faut-il attendre des outils d\'analyse automatique de la conception ? A toutes ces questions nous peinons � donner des r�ponses argument�es sur des bases concr�tes, et nous enlisons dans des d�bats souvent st�riles entre �c\'est Agile� et �ce n\'est pas Agile�. Par analogie au �neuromarketing� la �neuro-agilit� propose un autre angle de vision, qui vous apportera un regard diff�rent sur les pratiques de conception que vous connaissez d�j� et pourra vous inspirer des pistes prometteuses pour continuer � vous am�liorer. Elle vous entra�nera dans des recoins insoup�onn�s de votre propre cerveau, �quipement crucial � toute activit� de programmation et pourtant si m�connu, si peu explor� dans notre discipline du �g�nie logiciel�.','name':'Neuro-agilit�: un nouveau regard sur la conception','speakers':[{'id':1,'name':'Laurent Bossavit'}]};
session_data[2] = {'id':2,'schedule':[{'seats':110,'starttime':'10:00','endtime':'10:45','date':'2011-11-24','location':'Makalu'}],'description':'Les tests int�gr�s sont une arnaque, un virus qui s\'auto-r�plique et qui menace d\'infecter votre code source, votre projet et votre �quipe avec des promesses de douleur et de souffrance infinies. Mais comment �viter ces tests int�gr�s qui parcourent tout le syst�me m�me si elles v�rifient que des petits morceaux? Dans cette conf�rence, je vous propose une technique pour limiter le nombre de tests int�gr�s et �viter la �mort de la chaleur� qui vous attend si vous continuez avec vos tests int�gr�s. Version fran�aise (la meilleure possible) de la conf�rence �Integrated Tests Are A Scam� pr�sent�e partout dans le monde depuis 2009.Vous allez au moins savoir comment utiliser les objets dits �mock� de mani�re utile, et �viter les confusions qui habituellement arrivent lors de quelques semaines (ou mois) d\'exp�rience avec ces �mock�s. Aussi, vous allez apprendre une strat�gie pour couvrir 99% de votre base de code avec des tests qui ex�cutent dans des dizaines de secondes, et non des heures.','name':'Les tests int�gr�s sont une arnaque!','speakers':[{'id':2,'name':'J. B. Rainsberger'}]};
session_data[3] = {'id':3,'schedule':[{'seats':50,'starttime':'10:00','endtime':'10:45','date':'2011-11-24','location':'Kilimandjaro 1-2'}],'description':'Venez �couter l�histoire d�une petite �quipe qui a d�cid� de r�aliser un jeu vid�o dans un environnement extr�me o�:l��quipe est nouvellement constitu�e, personne ne se conna�t. la technologie est nouvelle pour tout le monde. les d�lais sont tr�s courts (2 mois). le jeu n�est que tr�s sommairement d�fini. Malgr� tout, cette �quipe avait un atout dans son sac : une certaine exp�rience des pratiques et des m�thodes agiles.Quels sont les pi�ges dans lesquels nous sommes tomb�s ? Quelles pratiques ont �clair�es notre chemin ? Quelle est l�issue du projet ?','name':'Alone in the dark','speakers':[{'id':3,'name':'St�phane Hanser'}]};
session_data[4] = {'id':4,'schedule':[{'seats':50,'starttime':'10:00','endtime':'10:45','date':'2011-11-24','location':'Kilimandjaro 3-4'}],'description':'Dans le cadre d\'un projet strat�gique et complexe pour lequel nous avions de fortes contraintes sur le d�lai et le p�rim�tre, nous avons mis en place pas � pas la m�thode Agile Scrum. Nous vous proposons de d�couvrir notre parcours, nos difficult�s et nos succ�s apr�s 10 mois de pratique de l\'Agilit� et en particulier l\'effet catalyseur de motivation que cela a eu sur notre �quipe de d�veloppement.Venez d�couvrir une exp�rience r�ussie d\'une mise en place rapide de la m�thode Scrum. Nous pr�senterons en outre les pratiques d�int�gration continue avanc�es mises en �uvre pour optimiser les d�veloppements.','name':'l\'Agilit� ou comment doper l\'efficacit� et la motivation des �quipes','speakers':[{'id':4,'name':'Nicolas d\'Hennezel'}]};
session_data[5] = {'id':5,'schedule':[{'seats':75,'starttime':'10:00','endtime':'10:45','date':'2011-11-24','location':'Mont Blanc 1-2-3'}],'description':'Sans sens l\'adh�sion � la technologie est al�atoire. Mais le sens ne suffit pas. Si les dysfonctionnements sont trop lourds, leurs couts passent au dessus du sens et se traduise par des r�sistances. L\'effissens rend moins al�atoire la justinovation, donne sa raison d\'�tre � l\'anticipaction�Venez d�couvrir des concepts pr�cis et �prouv�s, une autre mani�re de faire de la performance.','name':'D�passer l\'efficacit� pour �tre agile : la proposition de l\'effissens','speakers':[{'id':7,'name':'Karim Benameur'}]};
session_data[6] = {'id':6,'schedule':[{'seats':25,'starttime':'10:00','endtime':'10:45','date':'2011-11-24','location':'Mont Blanc 4'}],'description':'Soyez les acteurs principaux de cet atelier en construisant un backlog prioris� de questions � partir de la technique �Cercles et Questions� de Peter Block. Cela vous permettra d�extraire la quintessence de l�exp�rience Agile d�une petite �quipe au sein d�une startup qui a su convaincre son management de l�int�r�t � franchir le pas. Etes-vous pr�t � relever le d�fi ?Venez:D�couvrir comment une �quipe de d�veloppeurs a mis en place l�agilit� pour am�liorer son fonctionnement.. Comprendre en quoi l�accompagnement aide une �quipe � l�adoption de Scrum dans une. entreprise.Exp�rimenter une technique permettant de faire �merger les sujets les plus importants.','name':'Devenez le Product Owner de notre retour d�exp�rience','speakers':[{'id':8,'name':'Pierre Taillard'}]};
session_data[7] = {'id':7,'schedule':[{'seats':40,'starttime':'10:00','endtime':'10:45','date':'2011-11-24','location':'Cervin'}],'description':'Grace � votre maitrise des pratiques agiles, r�pondez aux besoins de l�entreprise �Wahou ?�C�est � travers diff�rentes ��preuves� que nous �changerons sur les fa�ons d�utiliser le cadre Scrum comme levier pour la performance des �quipes. Nous esp�rons que ces �changes nourriront les plus curieux en leur donnant de nouveaux apprentissages sur le cadre Scrum, et permettront � certains de repartir avec d�autres questions en t�te Endossez le r�le d�un ScrumMaster, d�un Product Owner, d�un Membre d��quipe ou bien du PDG, et relevez les multiples d�fis auxquels votre �quipe fait face !Venez:Apprendre certaines choses sur le cadre de Scrum (r�les, r�unions�). Vous poser des questions sur la fa�on d�utiliser Scrum. Echanger sur des situations concr�tes gr�ce � nos retours d�exp�riences','name':'La session dont vous �tes le h�ros !','speakers':[{'id':11,'name':'Arnaud Benistant'}]};
session_data[8] = {'id':8,'schedule':[{'seats':40,'starttime':'10:00','endtime':'10:45','date':'2011-11-24','location':'Everest'}],'description':'Programmer est une t�che incroyablement ardue. Il faut faire preuve de discipline, assister semaine apr�s semaine � un Dojo D�veloppement, apprendre � d�rouler ses katas les yeux ferm�s. Et le reste du temps surmonter la peur qui �treint � chaque nouvelle ligne de code : est-on sur le point d\'ins�rer un vilain bug dans un logiciel en production, qui pourrait co�ter � son propri�taire plusieurs millions d\'euros ?Malgr� tout et bien souvent, programmer est �galement une t�che jouissive. Et s\'il nous arrive souvent de le penser, nous le gardons g�n�ralement pour nous. Il est rare que nous codions juste pour le fun (comme disent nos cousins qu�becois), juste pour c�l�brer combien nous aimons notre vie de programmeur.Cette session tentera de changer cet �tat de fait. Nous allons coder pour le plaisir, avec le secret espoir que certains des participants aimerons ce qu\'ils verront, d�cideront que c\'est ce qu\'il y a de plus cool au monde, et chercheront � reproduire l\'exp�rience partout sur la plan�te.Cette session offre aux participants l\'occasiond\'apprendre comment coder un jeu vid�o ��vintage��. de demander � des d�veloppeurs de faire des choses qu\'ils n\'auraient jamais os� faire eux-m�mes. de rencontrer d\'autres d�veloppeurs (qu\'ils soient ou non sortis du placard) et de c�l�brer un int�r�t commun pour l\'acte de d�veloppement en tant que tel. rire un bon coup','name':'Un Kata Marrant','speakers':[{'id':13,'name':'Emmanuel Gaillot'}]};
session_data[9] = {'id':9,'schedule':[{'seats':530,'starttime':'11:10','endtime':'12:05','date':'2011-11-24','location':'Auditorium'}],'description':'L\'agilit� est une approche radicalement diff�rente des autres m�thodes de d�veloppement pour le logiciel, mais n�anmoins tout n\'est pas nouveau et certaines pratiques d\'apprentissage peuvent �tre r�utilis�es avec succ�s, en particulier tout ce qui concerne l\'apprentissage par le jeu.Lors de cette pr�sentation, vous aurez l\'occasion :de mieux comprendre les leviers sur lesquels agit l\'apprentissage par le jeu,. de connaitre les principes pour cr�er un jeu qui marche,. de d�couvrir quelques jeux agiles parmi les plus populaires,. et �ventuellement de pratiquer un jeu simple en �quipe.','name':'Des Jeux Agiles pour apprendre','speakers':[{'id':15,'name':'Alexandre Boutin'}]};
session_data[10] = {'id':10,'schedule':[{'seats':110,'starttime':'11:10','endtime':'12:05','date':'2011-11-24','location':'Makalu'}],'description':'Nous souhaitons d�montrer que l�approche BDD fonctionne et apporte une plus-value importante � des gros projets industriels avec une forte contrainte qualit�. Nous allons montrer au cours d�une impl�mentation en direct notre activit� quotidienne depuis 1 an, avec notre PO qui �crira une story et un scenario de test en langage �humain�, puis le d�veloppeur/testeur qui int�grera le scenario � notre logiciel et l�ex�cutera en interagissant avec un instrument. Au cours de cette pr�sentation nous d�mystifierons l��criture de tests fonctionnels et leur complexit� de mise en place. Nous aborderons enfin les b�n�fices vus sur notre cycle de d�veloppement et la qualit� du logiciel.Les participants auront un retour concret sur notre exp�rience du BDD de plus d�un an. Ils pourront voir des exemples de code et aussi interagir avec les intervenants lors des questions r�ponses.','name':'D�monstration / Kata BDD sur un logiciel pilotant un instrument','speakers':[{'id':16,'name':'Matthieu Gironnet'}]};
session_data[11] = {'id':11,'schedule':[{'seats':50,'starttime':'11:10','endtime':'12:05','date':'2011-11-24','location':'Kilimandjaro 1-2'}],'description':'Le changement Agile commence souvent avec un fort accent sur les processus et pratiques de d�veloppement. Une fois que cet �l�ment de la cha�ne de valeur du produit global pour le d�veloppement est devenu optimis�, le goulot d��tranglement dans le syst�me se d�place ailleurs. Habituellement, il se d�place au niveau de la direction des produits, avec comme challenge de fournir les conditions et le soutien pour garder une �quipe agile se d�pla�ant � une vitesse sup�rieure.Afin de soutenir un changement plus important dans une organisation vers la m�thodologie Agile, il est essentiel de se focaliser �galement sur les �l�ments pr�liminaires au d�veloppement, souvent appel�e la �phase de d�couverte�. Gr�ce � une combinaison d�organisation planifi�e, de la d�couverte des besoin du produit et de cartographier les cas d�utilisation. La livraison par les �quipes sera organis�e pour travailler conform�ment au fonctionnalit�s attendues clairement d�finies et prioris�es afin de parvenir � une valeur ajout�e maximale.Dans cette session, je parlerai des combats concernant l�Agile en R&D qui est souvent confront� aux limites de livraison et de d�couverte des besoins, et comment mettre en place une approche de �Product Management� agile qui �tend � une �chelle globale la valeur de l�Agile plus en profondeur dans l\'organisation. Je vais aussi parler d\'une combinaison d\'approches et de techniques que j\'utilise en tant que coach - sp�cifiquement le �Chartering� et �User Story Mapping�.','name':'Cartographie agile de la gestion des produits','speakers':[{'id':18,'name':'Mack Adams'}]};
session_data[12] = {'id':12,'schedule':[{'seats':50,'starttime':'11:10','endtime':'12:05','date':'2011-11-24','location':'Kilimandjaro 3-4'}],'description':'Kanban est une approche de d�veloppement logiciel issue du Lean & Agile se diff�renciant des m�thodes it�ratives et incr�mentales, telles que Scrum, par son processus en flux tir�, ses cadences d�coupl�es et sa priorisation � la demande, mettant en application concr�tement le Juste � Temps et la limite sur le travail en cours. Les enjeux du Kanban d�passent le cadre du projet pour aller plus naturellement vers la gestion de portefeuille et impliquer l�organisation. Lors de cette sessions, nous ferons un tour d\'horizon du Kanban.Venez d�couvrir le Kanban, ses enjeux et ses fondamentaux.','name':'Kanban, un tour d\'horizon','speakers':[{'id':19,'name':'Laurent Morisseau'}]};
session_data[13] = {'id':13,'schedule':[{'seats':75,'starttime':'11:10','endtime':'12:05','date':'2011-11-24','location':'Mont Blanc 1-2-3'}],'description':'Le risque est g�n�ralement abord� en entreprise selon des approches analytiques sp�cialis�es. Le risque strat�gique d�di� � la Direction g�n�rale, la s�curit� des syst�mes d�information d�di�e aux informaticiens, la gestion des risques encourus par les projets d�di�e � leurs manageurs. Toutefois, la probl�matique de ma�trise des risques est complexe et m�rite d��tre envisag�e de fa�on globale et syst�mique. La mise en s�curit� de l�entreprise concerne l�ensemble du personnel et rel�ve d�une mise en synergie des comp�tences dans une optique de d�tection pr�coce des sources de dangers et d�anticipation des sc�narios de danger. L�agilit�, dans son essence m�me, invite � renouveler l�approche du risque en en faisant un sujet beaucoup plus transversal et collectif. La diffusion de l��tat d�esprit agile est une opportunit� pour le renforcement de la s�curit� globale au sein de l�entreprise.L�un des apports cruciaux des m�thodes de d�veloppement agiles est la diminution importante des risques en mode projet. L�objet de cette contribution est de montrer aux participants que l�adoption de l��tat d�esprit et des principes mis en �uvre par l�agilit� permet d�aller au-del� de la mise en s�curit� d�un projet particulier et que l�adoption d�une culture de l�agilit� est de nature � renforcer la s�curit� globale de l�entreprise.','name':'Agilit� et approche syst�mique du risque','speakers':[{'id':20,'name':'Jacques Fleurat'}]};
session_data[14] = {'id':14,'schedule':[{'seats':25,'starttime':'11:10','endtime':'12:05','date':'2011-11-24','location':'Mont Blanc 4'}],'description':'In this interactive session we will explore the question, what are the enemies of self-determination and how can we as agile practitioners/scrum masters/program managers protect, support and grow self-determining teams?You will learn subtle methods of facilitating self-determining teams and the art of creating the environment that is most condusive to self-determining teams.','name':'It�s What You Don�t Do That Counts','speakers':[{'id':21,'name':'Susan Hunter'}]};
session_data[15] = {'id':15,'schedule':[{'seats':40,'starttime':'11:10','endtime':'12:05','date':'2011-11-24','location':'Cervin'}],'description':'D�bat questions r�ponses sur l\'agilit� organis� de fa�on agile. Les participants sont invit�s � proposer des sujets pour compl�ter le backlog initial d�fini par les animateurs et � d�finir collectivement les priorit�s. Les questions sont trait�es dans l\'ordre ainsi d�fini. Apr�s la r�ponse ils sont invit�s � dire si la r�ponse leur a apport� ce qu\'ils attendaient, pour consid�rer, ou pas, si le sujet (une �story�) est consid�r� comme fini. L\'organisation et le suivi de la session seront effectu�es avec iceScrum, en mode ScrumBan. Les interactions avec l\'assistance se feront aussi avec des cartons rouges et verts. Quelques perturbations surviendront pendant la s�ance pour pimenter le d�roulement et avoir une session rock\'n roll tout en illustrant des pratiques agiles. Le backlog initial contient des sujets autour de Scrum et de l�agilit�.Venez:Avoir des r�ponses � leurs questions sur l\'agilit�.. Contribuer en apportant des compl�ments aux r�ponses (tout le monde dans l\'assistance peut participer).. Comprendre la m�canique de Scrum.. Appr�hender ce qu\'est le ScrumBan, avec l\'ajout de quelques pratiques Kanban dans Scrum.. Participer activement � l\'application de pratiques comme l\'ordonnancement d\'un backlog.. Voir, � travers iceScrum, ce que peut apporter un outil (open source).','name':'(ice)Scrum, agilit� et rock\'n roll','speakers':[{'id':23,'name':'Claude Aubry'}]};
session_data[16] = {'id':16,'schedule':[{'seats':40,'starttime':'11:10','endtime':'12:05','date':'2011-11-24','location':'Everest'}],'description':'Si personne ne doute de l�int�r�t des m�thodes agiles pour garantir le succ�s d�un projet informatique, encore faut-il que les concepts qui les sous-tendent soient int�gr�s dans le contrat, dans des termes clairs et compr�hensibles par le client : copilotage du projet, backlog, sprints, it�rations, facturation par �tapes, m�canismes de sorties du client en cours d�ex�cution,La contractualisation est souvent consid�r�e comme un obstacle � une d�marche Agile. Or, plus encore que pour un contrat de d�veloppement avec des m�thodes classiques, il convient d��tre vigilant quant � la r�daction des clauses contractuelles.La pr�sentation aura pour objectif de sensibiliser les participants � la n�cessit� de contractualiser avec soin leurs relations avec leurs clients et de leur fournir des recommandations s�appuyant sur des cas pratiques tir�s des exp�riences v�cues avec des soci�t�s comme SOGILIS.','name':'La contractualisation d�un projet Agile : enjeux et pi�ges','speakers':[{'id':25,'name':'Jean-Philippe Leclere'}]};
session_data[17] = {'id':17,'schedule':[{'seats':530,'starttime':'14:45','endtime':'15:40','date':'2011-11-24','location':'Auditorium'}],'description':'Schneider Electric s\'est engag� depuis 2011 dans l\'adoption des m�thodes Agiles au service du d�veloppement de ses offres de produits et de solutions. Venez d�couvrir comment une organisation Agile distribu�e permet de soutenir le d�ploiement global et rapide des m�thodes Agiles sur l�ensemble d�une entreprise internationale mettant en �uvre des projets multi-technologies. Le contexte de mise en �uvre de la transition Agile nous a conduits � mettre en place une dynamique bas�e sur l\'exp�rience des pr�curseurs et � collecter aupr�s des �quipes projets impliqu�es des retours d\'exp�rience en temps r�el.Les participants sont invit�s � partager les retours d\'exp�rience de l\'�quipe Corporate de Schneider Electric en charge d\'animer la transition Agile de l�entreprise. Les enjeux, l\'envergure et les contraintes li�es � un groupe international seront remis dans leurs contextes. Les bonnes pratiques et les principaux �cueils rencontr�s seront d�taill�s.Mots-clefs : Transition Agile, Organisation distribu�e, cohabitation waterfall / Agile','name':'Agile Offer Creation program in Schneider Electric','speakers':[{'id':27,'name':'Herv� Dondey'}]};
session_data[18] = {'id':18,'schedule':[{'seats':110,'starttime':'14:45','endtime':'15:40','date':'2011-11-24','location':'Makalu'}],'description':'Le Mikado est une m�thode d�ajout de fonctionnalit� dans une application existante non pr�vue pour (legacy).Cette m�thode maintient le code dans un �tat livrable, et par cons�quent nous profitons d�un feedback intense � travers le compilateur, les tests et m�me les livraisons. Le r�sultat est entre autre une r�duction des co�ts. Elle permet aussi de focaliser les efforts en convergeant vers un but clair.Venez voir la m�thode Mikado � l��uvre et comprendre pourquoi elle s�appelle ainsi.Vous allez d�couvrir une m�thode simple et l�ger qui vous permet de travailler dans du legacy avec :Une meilleur visibilit� pour tout le monde.. Moins de bugs. Moins de stress. Tout en r�duisant le WIP (Work In Progress). Et vous pourrez m�me l�essayer d�s le lendemain!','name':'Ma�triser le legacy avec Mikado','speakers':[{'id':29,'name':'Johan Martinsson'}]};
session_data[19] = {'id':19,'schedule':[{'seats':50,'starttime':'14:45','endtime':'15:40','date':'2011-11-24','location':'Kilimandjaro 1-2'}],'description':'R�guli�rement, les �quipes agiles se heurtent � la D�finition du Fini : on ne n�gocie pas sur la Qualit� du produit. Mais qu\'en est-il de la D�finition du Pr�t ? � savoir, pr�parer correctement le contenu du Sprint � venir ? de la Release � venir ? de la Roadmap � venir ? Quel est l\'impact sur une Organisation apprenante en termes de gestion de portefeuille de projets ? De quels moyens dispose cette Entreprise agile pour �commencer� le voyage ? en quoi consiste la transition et comment s\'appuyer sur de nouvelles techniques d\'animation d\'ateliers ?Les participants trouveront ici des pistes pour am�liorer la performance des �quipes de d�veloppement, optimiser l\'alimentation des �quipes avec des items d�clar�s �pr�ts� en se pr�parant d�s les phases amonts de constitution du portefeuille de projets. Ce sera avec un grand int�r�t que Fabrice r�cup�rera et tiendra compte de vos diff�rents feedbacks (Inspect & Adapt).','name':'Agile Portfolio','speakers':[{'id':31,'name':'Fabrice Aimetti'}]};
session_data[20] = {'id':20,'schedule':[{'seats':50,'starttime':'14:45','endtime':'15:40','date':'2011-11-24','location':'Kilimandjaro 3-4'}],'description':'Sur un projet Front End d�velopp� en Agile, le Product Owner prot�ge les int�r�ts strat�giques tandis que le Team Leader repr�sente la capacit� technique et la vision des d�veloppeurs. Voici un nouvel acteur: le sp�cialiste de l�exp�rience utilisateur, qui repr�sente les utilisateurs et consommateurs du produit, cr�e puis impl�mente la vision globale de leur exp�rience. Souvent un composite de praticien ergonome, designer d�interfaces et architecte de l�information, il dynamise la prise en consid�ration de l�utilisateur par l��quipe et apporte des outils de d�cision qui permettent de r�duire les inconnus et d�augmenter l�ad�quation probl�me/solution. Comprendre son r�le, ses outils permet de maximiser son efficacit� au sein de l��quipe globale, qu�il soude autour d�une cible commune: l�utilisateur et son exp�rience.Dans cette pr�sentation, destin�e � tous les praticiens Agile et/ou Lean, j�introduirai ce r�le encore sous-repr�sent� en France et proposerai des mod�les de collaboration efficace permettant que l\'exp�rience utilisateur demeure consistante et optimale au long des diff�rentes it�rations et livraisons. Je pr�senterai les techniques employ�es ainsi que les diff�rents art�facts qui peuvent �tre produits lors des phases strat�giques et de d�veloppement et en d�montrerai les b�n�fices pour les diff�rents acteurs du projet. Enfin j�introduirai des propositions de validation des connaissances par tests utilisateurs g�rables dans le cadre de sprints.','name':'L\'architecte de l�exp�rience utilisateur, un membre cl� des projets front end Agile/Lean: pr�sentation du r�le, conseils de collaboration.','speakers':[{'id':32,'name':'Sophie Freiermuth'}]};
session_data[21] = {'id':21,'schedule':[{'seats':75,'starttime':'14:45','endtime':'15:40','date':'2011-11-24','location':'Mont Blanc 1-2-3'}],'description':'Les histoires utilisateurs (ou user stories) sont au centre de la m�thodologie Scrum. Ces histoires constituent la mati�re premi�re de chaque it�ration. En premi�re partie, la pr�sentation portera sur l\'aspect qualititatif des histoires utilisateurs. Comment reconna�tre une bonne histoire ? Comment am�liorer leur qualit� ? La deuxi�me partie de la pr�sentation portera sur la planification des it�rations (Sprints). Deux m�thodes seront vues en d�tail : la planification par la v�locit� (velocity planning) et la planification par la capacit� (capacity planning).� la fin de la session, les auditeurs sauront exactement � quel moment il convient d\'appliquer l\'une ou l\'autre de ces m�thodes dans leurs projets, et comment le faire. Finalement, un lien permettant de t�l�charger un outil pour r�aliser un capacity planning efficacement sera offert.','name':'Une bonne histoire !','speakers':[{'id':33,'name':'Pierre Vachon'}]};
session_data[22] = {'id':22,'schedule':[{'seats':25,'starttime':'14:45','endtime':'15:40','date':'2011-11-24','location':'Mont Blanc 4'}],'description':'Vous avez tant bien que mal r�ussi � constituer un backlog produit, en impliquant (un peu) le client, il y a m�me quelques user stories dedans, et maintenant il va falloir commencer � d�velopper. Mais bien s�r, impossible de prioriser� MoSCoW c�est bien, mais on ne fait que les Must alors ? Et deux ou trois Should si on a le temps ? Hummm� On fait autrement ? Des story maps par exemple ?Une heure pour vous expliquer ce que je fais avec cet outil, le mettre en oeuvre par petits groupes et �changer sur ce th�me.Venez apprendre sur des exemples concrets � :identifier le plus court chemin menant � un produit livrable, et donc � des retours des utilisateurs. collaborer, faire participer tous les intervenants. mettre en oeuvre les techniques d�expression de besoin : user story, story map - les utiliser et les adapter','name':'Story Map : objectif feed-back !','speakers':[{'id':34,'name':'Thierry Vall�e'}]};
session_data[23] = {'id':23,'schedule':[{'seats':40,'starttime':'14:45','endtime':'15:40','date':'2011-11-24','location':'Cervin'}],'description':'Avez-vous l\'impression qu\'une routine s\'est install�e dans vos r�trospectives? Vous cherchez des id�es pour les renouveler? A la cl� de cette session : une formule de r�tro �qui marche�, et plusieurs suggestions d\'activit�s �test�es et approuv�es�. De sprint en sprint, m�me s�il ressortait toujours des pistes d�am�lioration int�ressantes, le besoin d�apporter quelques changements au d�roulement des r�trospectives s�est fait sentir. La lecture de � Agile Retrospectives � (E. Derby / D. Larsen, co-fondatrices avec N. Kerth du � Retrospective Facilitators Gathering � annuel), nous a donn� envie d�en revoir la structure, et nous y avons �galement trouv� une mine d�id�es d�activit�s pour chaque phase. Nous partagerons avec les participants notre exp�rience � R�trospectives�lab � men�e sur quelques sprints et avec plusieurs �quipes de d�veloppement : les changements apport�s en utilisant la structure propos�e par E. Derby/D. Larsen et un retour d\'exp�rience sur les activit�s utilis�es.Les participants gagneront ou approfondiront leurs connaissances sur la facilitation de r�trospectives (les �tapes cl�s d\'une r�trospective). Ils trouveront �galement des id�es d\'activit�s (via un retour d\'exp�rience) pour varier leurs r�trospectives.','name':'R�trospectives�lab : d�cantation','speakers':[{'id':35,'name':'Emilie Franchomme'}]};
session_data[24] = {'id':24,'schedule':[{'seats':40,'starttime':'14:45','endtime':'15:40','date':'2011-11-24','location':'Everest'}],'description':'L�innovation est devenue le fer de lance des soci�t�s pour se d�marquer et s�ouvrir de nouveaux march�s. Processus � part enti�re, elle peut avoir pour objectif la provocation d�une innovation de rupture. En nous positionnant dans le cadre d�fini par Hatchuel, Le Masson et Weil qui d�finissent les interactions entre Recherche, Innovation et D�veloppement (RID), nous souhaitons d�montrer que l�application de la m�thode agile Scrum � ces trois processus permet d�avoir un cadre unifi� et homog�ne qui facilite la gestion de ces trois domaines. Nous d�montrons notamment la pertinence de cette approche dans le cas de la RID dans une SSII (Soci�t� de Service en Ing�nierie Informatique).Les participants pourront voir l�application de Scrum dans un domaine innovant et plus �largi qu�un projet standard de d�veloppement. Ils pourront d�couvrir comment Scrum est appliqu� dans ce domaine RID (Recherche, Innovation et D�veloppement), permet d�unifier la gestion de projet, et de plus identifier les voies d�exploration possibles.','name':'Scrum et innovation','speakers':[{'id':36,'name':'Fabrice Bazzaro'}]};
session_data[25] = {'id':25,'schedule':[{'seats':530,'starttime':'16:45','endtime':'17:10','date':'2011-11-24','location':'Auditorium'}],'description':'Scrum n\'est pas la 42�me m�thode de gestion de projets. Il y a des bases de gestion de projets traditionnelles. Il y a d\'autre bases pour la r�alisation en mode Agile. Si vous �tes satisfait avec les m�thodes traditionnelles, pourquoi en changer ? Si vous souhaitez des gains importants en passant dans un cadre Agile, oui, allez-y. Et si vous �tes d�cid�s � tenter l\'aventure en sous-traitance, alors il y a quelque petites choses que vous devez savoir �Cette session n\'a pas pour but de donner des recettes de contrat ��forfait Agile��. L\'objectif de cette session est d\'ouvrir un espace de r�flexion sur l\'association Agilit� et contrat et de faire bouger les lignes pour poser de nouvelles bases autorisant la performance Agile en sous-traitance.','name':'Ce que vous devez savoir � propos de la contractualisation Agile','speakers':[{'id':38,'name':'Jean-Fran�ois Jagodzinski'}]};
session_data[26] = {'id':26,'schedule':[{'seats':110,'starttime':'16:45','endtime':'17:10','date':'2011-11-24','location':'Makalu'}],'description':'La gestion de configuration est un �l�ment essentiel pour le d�veloppement d\'une application. N�anmoins, au quotidien cette pratique reste encore douloureuse. Une des causes est la ma�trise et les fonctionnalit�s propos�es par l\'outil utilis�.Dans cette session technique, un groupe de d�veloppeurs vous invite � d�couvrir GIT (un gestionnaire de versions d�centralis�e) au travers de tranches de vie de d�veloppement. L\'objectif est de montrer l\'utilisation de GIT et son apport dans vos pratiques quotidiennes en terme de gestion de configuration. Cette session n\'a pas pour but de faire un comparatif avec SVN, Mercurial, Bazaar� et vous ne deviendrez pas un expert GIT � la fin de la pr�sentation.Le souhait de cette session est triple : passer un bon moment, pratique en direct et �tre capable de mettre en pratique le lendemain dans son activit� de d�veloppement.','name':'Git au quotidien','speakers':[{'id':39,'name':'Guillaume Gardais'}]};
session_data[27] = {'id':27,'schedule':[{'seats':50,'starttime':'16:45','endtime':'17:10','date':'2011-11-24','location':'Kilimandjaro 1-2'}],'description':'Agilit�, Innovation Games�, World Caf�, Fish Bowl, Holacratie� � La bo�te � Outils a exp�riment� de mani�re massive des processus innovants et vari�s, tant en mati�re de formation, de cr�ativit� et aussi de gouvernance d�entreprise. Former, responsabiliser, d�cloisonner, collaborer, g�n�rer de l�intelligence collective, cr�er de la valeur gr�ce � des femmes et de hommes heureux et motiv�s sont les fils conducteurs de ses exp�rimentations.Cette session sera un retour d�exp�rience des succ�s et aussi des difficult�s rencontr�es. Organis�e sous la forme d�un Fish Bowl, vos questions et apports dynamiseront la session, vous choisirez le programme en testant diverse sorte de processus de s�lection (il y aura des surprises).','name':'Comment rendre nos entreprises Agile ?','speakers':[{'id':41,'name':'Fr�d�ric Dufau-Jo�l'}]};
session_data[28] = {'id':28,'schedule':[{'seats':50,'starttime':'16:45','endtime':'17:10','date':'2011-11-24','location':'Kilimandjaro 3-4'}],'description':'Il y a 6 mois� nous d�cidions de basculer un portefeuille de projets et TMA en agile� Freins, peurs, difficult�s, changement (pour management, DP, CP, client PO, �quipe�), contrats, reporting, MCO avec bugs impr�visibles et bloquants� Nous allons pr�senter les outils et pratiques agiles que nous avons mises en place progressivement dans une relation Front Office Back Office pour une �quipe agile � distance.Accompagnement du changement / bascule agile (pr�parer, convaincre, anticiper, accompagner). Rex sur TMA en agile. Rex sur Portfolio agile. Rex sur agilit� et travail � distance','name':'REX Bascule en agile d\'un portefeuille de projets et TMA','speakers':[{'id':42,'name':'Jean Dupuis'}]};
session_data[29] = {'id':29,'schedule':[{'seats':75,'starttime':'16:45','endtime':'17:10','date':'2011-11-24','location':'Mont Blanc 1-2-3'}],'description':'L\'agilit� d�finit trois r�les importants : le Client, le D�veloppeur, le Manager. Si les deux premiers r�les sont aujourd\'hui entr�s dans le quotidien d\'une �quipe agile, le Manager est bien souvent �hors circuit�. Pourtant, il joue un r�le cl� en agilit�. Cette pr�sentation explique ce qu\'est un Manager agile.Venez d�couvrir comment:Mieux int�grer le Management dans la d�marche agile. Rassurer les Managers qui per�oivent parfois le passage � l\'agilit� comme une menace pour leur fonction. Planifier l\'accompagnement des Managers dans une approche agile.','name':'Manager agile : concr�tement','speakers':[{'id':44,'name':'Thierry Cros'}]};
session_data[30] = {'id':30,'schedule':[{'seats':25,'starttime':'16:45','endtime':'17:10','date':'2011-11-24','location':'Mont Blanc 4'}],'description':'Une s�ance ludique d�entrainement � la simplicit�, la communication et la collaboration. Vous choisirez votre programme de jeux inspir�s des techniques d�entrainement � l�improvisation th��trale avec � buy a Feature � (Innovation Games�). Le c�l�bre jeu � des chaises non musicales � prim� � Boston gr�ce � Alex sera du programme, si c�est votre choix !Venez:D�couvrir un processus de coh�sion d��quipe Agile.. D�velopper ses qualit�s individuelles de confiance, d��coute, d��nergie et de cr�ativit� pour nous aider � mieux collaborer et communiquer.','name':'Jouer pour �tre plus Agile','speakers':[{'id':45,'name':'J�r�me Cuttaz'}]};
session_data[31] = {'id':31,'schedule':[{'seats':40,'starttime':'16:45','endtime':'17:10','date':'2011-11-24','location':'Cervin'}],'description':'Sur la base de la proposition standard Scrum+XP (sur laquelle je ne reviens pas), je passe en revue ce que nous avons vu fonctionner ou �chouer sur le terrain. Cela inclus un certain nombre de choses tr�s concr�tes sur la fa�on de mettre en pratique des propositions Scrum souvent peu d�taill�es, comme � il faut faire un backlog produit �','name':'Retour sur 4 ans d�industrialisation de l�agilit� chez Orange','speakers':[{'id':48,'name':'R�my Genin'}]};
session_data[32] = {'id':32,'schedule':[{'seats':40,'starttime':'16:45','endtime':'17:10','date':'2011-11-24','location':'Everest'}],'description':'Lorsque l\'agilit� devient une �initiative Corporate�, qu\'un nouveau processus �merge, que des projets pilotes sont lanc�s, alors tout devient possible. . Lorsque le Product Owner a une vraie force pour faire avancer le projet, poss�de un budget confortable et une ambition g�rable, quand il �tablit une vraie relation avec l\'�quipe, alors le projet avance.. Lorsque le projet est coach� d�s le d�part, que les bons messages sont pass�s au client, que l\'�quipe est form�e et ouverte au changement, que le Scrum Master est exp�riment�, alors tout le monde est motiv�.. Bienvenue dans un projet pilote, bienvenue dans un projet r�v� ! . Nous verrons aussi que lorsque le r�ve devient r�alit�, il se heurte � quelques difficult�s ou r�sistances tr�s terre � terre qu\'il nous faut surmonter !B�n�fices attendus pour les participants :Apprendre:. les bonnes pratiques � mettre en place au d�marrage d\'un projet. comment d�finir un processus agile avec des personnes qui ne le sont pas (au d�part). Voir : que beaucoup de choses sont possibles, qu\'il suffit parfois d\'oser. Comprendre : qu\'il faut parler, promouvoir, �vang�liser, faire conna�tre, r�p�ter, expliquer encore et toujours l\'agilit�. Tous les jours et pour tout le monde.. Constater : qu\'il y a des r�ticences, les comprendre et essayer de les surmonter','name':'Y a t-il un pilote dans le projet ?','speakers':[{'id':49,'name':'Laurence Hanot'}]};
session_data[33] = {'id':33,'schedule':[{'seats':530,'starttime':'17:25','endtime':'18:20','date':'2011-11-24','location':'Auditorium'}],'description':'Nous proposons de pr�senter un retour d\'exp�rience sur le premier projet avionique externalis� ayant abouti � une satisfaction sur tous les points.En effet, le logiciel a �t� livr� dans les d�lais et avec un niveau de qualit� au del� des exigences du client. L\'int�gration du livrable s\'est r�alis�e avec un minimum d\'effort. Gr�ce � l\'approche agile, ce projet fut aussi un succ�s d\'un point de vue humain chez le client comme chez le fournisseur. Il s\'est instaur� une collaboration en confiance entre les acteurs du projet.Nous pr�sentons �galement les probl�mes li�s � ce fonctionnement, ainsi que des possibilit�s d\'am�lioration pour gagner en efficacit� (ne pas lire productivit�). Nous esp�rons ainsi donner des pistes pour changer l\'externalisation de projets logiciels.Les participants auront un retour d\'exp�rience r�el, dans un contexte industriel particuli�rement exigeant. De plus, l\'externalisation agile n\'est pas encore une pratique courante, surtout dans le monde de l\'avionique. Cette session constituera donc un exemple de collaboration r�ussie � travers des �l�ments concrets de valeur ajout�e, de transparence et de r�solution de probl�mes qui ont permis d\'aboutir au succ�s.Les professionnels, quant � eux, gagneront les moyens de r�fl�chir � une autre mani�re de collaborer avec leurs clients/fournisseurs pour que la confiance mutuelle et la satisfaction remplace la m�fiance, les d�cisions d�fensives et les d�ceptions.La session laisse �galement une large part au dialogue avec les participants qui ont souvent beaucoup de questions dans le cas d\'un retour d\'exp�rience.','name':'Externalisation agile d\'un projet avionique : les ingr�dients d\'un succ�s','speakers':[{'id':50,'name':'Etienne Zwiebel'}]};
session_data[34] = {'id':34,'schedule':[{'seats':110,'starttime':'17:25','endtime':'18:20','date':'2011-11-24','location':'Makalu'}],'description':'Avoir des millions d\'amis, comparer des millions d\'offres ou publier des millions de news sont autant d�exemples d�applications �crites en PHP. Ce langage de la �programmation pour les nuls�, qui permet tous les �carts, reste pourtant un choix privil�gi� pour les solutions web. Avec les bons outils et les bonnes pratiques, ce langage est modulable, testable et facilement livrable. Au travers d�une approche technique montrant par l�exemple quels instruments choisir, d�couvrez comment jouer la partition d�une symphonie pour PHP industrialis� en agilit� majeure.Au programme:D�gager un boilerplate d�un projet PHP ou comment ne pas tout jeter � l�arriv�e. Reprendre la main sur leur projet frontend et avoir une strat�gie de refactoring par les tests. �Not only working software, but also well-crafted software� - Manifesto for Software Craftsmanship','name':'Symphonie pour PHP industrialis� en agilit� majeure','speakers':[{'id':51,'name':'Jonathan Bonzy'}]};
session_data[35] = {'id':35,'schedule':[{'seats':50,'starttime':'17:25','endtime':'18:20','date':'2011-11-24','location':'Kilimandjaro 1-2'}],'description':'Depuis bient�t deux ans au sein du p�le technologies d\'Agence Interactive, nous assurons en mode Agile, pilotage, d�veloppement, d�ploiement et entretien de ce que nous produisons. Avec SCRUM, nous r�alisons au forfait les dispositifs Web con�us dans le cadre de projets de communication digitale. Avec Kanban, nous assurons au quotidien les am�liorations, le webmastering et la maintenance de tous les sites. Au travers de cette pr�sentation, nous expliquerons comment l�utilisation conjointe de l�it�ratif et du lean sur les m�mes �quipes nous a permis de concilier la gestion d�une activit� de p�le de service et des r�alisations en mode projet. Nous tenterons �galement par notre t�moignage de vous faire partager un peu de ce fantastique chemin qu�est l\'adoption de l\'agilit�.Les participants obtiendront:Une meilleure compr�hension des challenges et des �tapes d�un projet de conduite du changement vers l�agilit�.. Le b�n�fice d�un retour d�exp�rience sur l�utilisation conjointe de Kanban et SCRUM dans un backlog � 2 niveaux. (nos sprints sont des kanban). L�envie de passer d�une planification traditionnelle � une planification Agile.','name':'KANBAN et SCRUM au sein d\'une agence digitale','speakers':[{'id':54,'name':'Christophe Ney'}]};
session_data[36] = {'id':36,'schedule':[{'seats':50,'starttime':'17:25','endtime':'18:20','date':'2011-11-24','location':'Kilimandjaro 3-4'}],'description':'Un groupe de PO, pratiquant l�agilit� depuis 6 ans, vous invite � partager leur �volutions ainsi que leur changement de vision du r�le de PO dans leur vie de tous les jours. Nous pr�senterons comment d�un PO marketing, nous avons �volu� vers un PO embarqu� dans l��quipe. Nous expliquerons les raisons et les facteurs de ces changements et notamment le principe Lean d�am�lioration continue. Les principaux b�n�fices de ces �volutions sont une bien meilleure ad�quation entre les stories et les besoins de l��quipe, une validation du produit plus adapt�e ainsi qu�une r�duction des provisions et du travail inutile.Partage d\'experiences. Meilleur compr�hension du r�le de PO. Acquisition de pistes pour adapter le r�le du PO dans leur structures','name':'Nos Product Owner (Pos), ils ressemblent � quoi aujourd�hui ?','speakers':[{'id':55,'name':'Isabelle Coelho'}]};
session_data[37] = {'id':37,'schedule':[{'seats':75,'starttime':'17:25','endtime':'18:20','date':'2011-11-24','location':'Mont Blanc 1-2-3'}],'description':'Devenir agile am�ne � d�velopper de nouveaux comportements dans l\'acte de manager. Que cela signifiet-il concr�tement dans le domaine du management des Ressources Humaines. Je propose de reprendre les concepts de l\'agilit� comportemental et d\'en traduire les fondamentaux en terme de Gestion des Ressources Humaines. Recruter, Former, G�rer les comp�tences (GPEC), G�rer les carri�res, R�mun�rer ou encore fixer des objectifs sont autant de th�mes qui seront red�finis dans leurs enjeux et pratiques avec l\'approche agile.Cette session vous ermettra de comprendre en quoi les pratiques de GRH doivent �voluer. Comment permettre aux salari�s de se sentir mieux dans les organisations lorsque la GRH devient agile. Pourquoi et comment ne pas reproduire les outils de management encore trop usit�. Donner quelques cl�s simples de r�flexion et d\'analyse permettant aux managers de se poser les �bonnes� questions avant d\'agir en GRH.','name':'Agilit� et GRH','speakers':[{'id':59,'name':'Thomas Tarradas'}]};
session_data[38] = {'id':38,'schedule':[{'seats':25,'starttime':'17:25','endtime':'18:20','date':'2011-11-24','location':'Mont Blanc 4'}],'description':'Par analogie au �neuromarketing�, NeuroAgile d�signe l\'intersection entre les approches agiles et les sciences qui �tudient le cerveau et l\'esprit humain: des neurosciences � la psychologie sociale en passant par les sciences cognitives.Cet atelier invite les participants � explorer en petit groupes un certain nombre de ce qu\'on appelle les �biais cognitifs�, manifestations du support imparfait - le cerveau - qui abrite notre esprit aspirant � la rationalit�. Des exercices permettent de toucher du doigt la r�alit� de ces ph�nom�nes puis une phase de brainstorming a pour objectif de trouver des applications nouvelles � la r�alit� quotidienne des projets de d�veloppement: techniques exp�rimentales peut-�tre appel�es � devenir de nouvelles pratiques Agiles?','name':'Atelier NeuroAgile','speakers':[{'id':60,'name':'Laurent Bossavit'}]};
session_data[39] = {'id':39,'schedule':[{'seats':40,'starttime':'17:25','endtime':'18:20','date':'2011-11-24','location':'Cervin'}],'description':'Les applications m�tiers ont souvent besoin d\'�tre adapt�s au contexte de l\'entreprise qui les mets en �uvre. Rapidement, la maintenance de ces adaptations maisons co�tent cher, voire bloquent les �volutions. Comment une approche Agile peut nous aider � contourner ce probl�me. Agilit� et Open Source sont les deux piliers de cette approche qui garantie au client la r�duction des co�ts de maintenances et le non fork.Cette session vous apportera:Une vision diff�rente de la relation client fournisseur dans un relation complexe ou le client n\'est pas seulement consommateur d\'un service ou d\'un bien.. Mais aussi les opportunit�s d\'organisation diff�rentes qu\'offrent l\'Agilit� et le Libre (Open Source).','name':'L\'agilit� support au co-d�veloppement','speakers':[{'id':61,'name':'Manuel Vacelet'}]};
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


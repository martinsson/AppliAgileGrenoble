cfunited.ui.Speakers = Ext.extend(Ext.Panel,{
	id:'speakers-card',
	fullscreen:true,
	title:'Orateurs',
	iconCls:'team',
	layout:'card',
	initComponent: function(){

		this.titlebar = new Ext.Toolbar({
			title:'Speakers',
			dock:'top'
		});		
	
		Ext.regModel("Speaker",{
			fields:['id','name','companyname','bio','topics']
		});
		
		var tpl = new Ext.XTemplate(
			'<tpl for=".">',
				'<div class="speaker">',
					'<strong>{name}</strong>',
				'</div>',
			'</tpl>'
		);
				
		this.speakers = new Ext.List({
			id:'speakerList',
			fullscreen:true,
			tpl:tpl,
			itemSelector: 'div.speaker',
			singleSelect:true,
			grouped:true,
			indexBar:true,
			dockedItems:[this.titlebar],
			store: new Ext.data.Store({
				model:'Speaker',
				sorters:'name',
				getGroupString : function(record){
					return record.get('name')[0];
				}
			})			
		});
		
		this.speakerDetails = new cfunited.ui.SpeakerDetails();
		
		this.items = [this.speakers,this.speakerDetails];
		
		cfunited.ui.Speakers.superclass.initComponent.apply(this, arguments);
		
		this.speakers.on('itemtap',this.onItemTap,this);
		
	},
	
	onBack: function(){
		//
	},
	
	onItemTap: function(view,index,item,e){
		var rec = view.store.getAt(index);		
		
		this.speakerDetails.loadSpeaker(rec.data);
		this.setCard(1);
	},

	onLoad: function(){
		Ext.getBody().mask(false, '<div class="loading">Loading&hellip;</div>');
		var speakers_data = new Object();
		
		speakers_data =	
		[
		{'id':50,'companyname':'Club Agile Rh�ne Alpes','bio':'Le Club Agile Rh�ne Alpes � CARA est une association loi 1901 qui se donne pour objectifs la promotion et la diffusion des m�thodes agiles dans la r�gion Rh�ne-Alpes par tous moyens de communication et d\'intervention: conf�rence, s�minaire, rencontre, accompagnement, consulting, formation.','name':'CARA','topics':[{'id':10,'name':'CARA'}]},	
		{'id':54,'companyname':'','bio':'Karl Scotland Karl SCOTLAND est un praticien logiciel polyvalent de plus de 15 ans d�exp�rience dans les domaines du d�veloppement, de la gestion de projet, du leadership d��quipe, du coaching et de la formation.','name':'Scotland Karl','topics':[{'id':1,'name':'Karl Scotland�Starting An Agile Transition with Why�'}]},			
		{'id':1,'companyname':'Institut Agile','bio':'Laurent Bossavit est directeur de l\'Institut Agile, organisation ind�pendante qui a pour mission de promouvoir la recherche sur les pratiques agiles et de faciliter leur adoption dans les entreprises. Anciennement d�veloppeur avec plus de 20 ans d\'exp�rience pratique, il compte parmi les premiers d�couvreurs des pratiques agiles en France.','name':'Bossavit Laurent','topics':[{'id':1,'name':'Neuro-agilit�: un nouveau regard sur la conception'},{'id':38,'name':'Atelier NeuroAgile'}]},		
		{'id':2,'companyname':'Jbrains','bio':'J. B. (Joe) Rainsberger helps software organizations better satisfy their customers and the businesses they support. Expert at delivering successful software, he writes, teaches and speaks about why delivering better software is important, but not enough. He helps clients improve their bottom line by coaching teams as well as leading change programs. He helps software organizations off the treadmill of over-commitment and under-delivery, addressing all aspects of software delivery including understanding the business, gelling the team and even writing great code. Learn more about how Joe will inspire your software organization at jbrains.ca, at conferences world-wide, or by writing him directly at me@jbrains.ca.','name':'Rainsberger J. B.','topics':[{'id':2,'name':'Les tests int�gr�s sont une arnaque!'}]},		
		{'id':3,'companyname':'Captive Studio','bio':'Programmeur extr�me et responsable de production de jeu vid�o depuis 2006, St�phane s\'est lanc� en 2008 dans la cr�ation de la soci�t� Captive Studio pour produire des logiciels de divertissement. St�phane est coordinateur du chapitre parisien de l\'IGDA et promeut l\'agilit� dans l\'industrie fran�aise du jeu vid�o','name':'Hanser St�phane','topics':[{'id':3,'name':'Alone in the dark'}]},
		{'id':4,'companyname':'','bio':'Chef de projet depuis 10 ans chez un �diteur de progiciels professionnels. Depuis plus de 6 ans nos projets int�grent une part de plus en plus importante de d�veloppements sp�cifiques. Avec 2 autres membres de l\'�quipe projet, nous avons �t� moteur dans la mise en place de la m�thode Scrum, o� j\ai pris le r�le de Scrum Master.','name':'D\'Hennezel Nicolas','topics':[{'id':4,'name':'l\'Agilit� ou comment doper l\'efficacit� et la motivation des �quipes'}]},		
		{'id':5,'companyname':'','bio':'','name':'Pattein Francis','topics':[{'id':4,'name':'l\'Agilit� ou comment doper l\'efficacit� et la motivation des �quipes'}]},	
		{'id':6,'companyname':'','bio':'Consultant exp�riment� et dans l\'entreprise depuis 5 ans, l\'un des moteurs de la mise en place de la m�thode Scrum. Il a pris le r�le de Product Owner de part le fait qu\'il a r�alis� toute la phase de d�finition de la solution avec le client avant la mise en place de l\'Agilit�. Il a pris en main et ma�tris� tr�s rapidement son r�le et les outils de la m�thode qu\'il a fait �volu� et adapt� � notre contexte.','name':'Griffon Xavier','topics':[{'id':4,'name':'l\'Agilit� ou comment doper l\'efficacit� et la motivation des �quipes'}]},		
		{'id':7,'companyname':'Effissens','bio':'DESS GRH DRH d\'ing�ni�rie G�rant d\'entreprise Enseignant consultant � GEM et l\'ecole nationale d\'architecture de grenoble','name':'Benameur Karim','topics':[{'id':7,'name':'D�passer l\'efficacit� pour �tre agile : la proposition de l\'effissens'}]},		
		{'id':8,'companyname':'Coupling Wave Solutions','bio':'Pierre est ing�nieur de recherche et d�veloppement logiciel sp�cialis� dans la programmation orient�e objet avec plus de 7 ans d\�exp�rience et a rejoint CWS en 2006. Il a �t� l�initiateur de l\�agilit� au sein de l\��quipe et tient depuis le r�le de ScrumMaster (certifi� Professional Scrum Master en F�vrier 2011) et membre de l\��quipe SCRUM. ','name':'Taillard Pierre','topics':[{'id':8,'name':'Devenez le Product Owner de notre retour d�exp�rience'}]},		
		{'id':9,'companyname':'Coupling Wave Solutions','bio':'Sylvain est ing�nieur de recherche et d�veloppement logiciel sp�cialis� dans la programmation orient�e objet avec plus de 15 ans d\�exp�rience et a rejoint CWS en 2007. Il tient le r�le de membre de l\��quipe SCRUM.','name':'Pointeau-Carbanne Sylvain','topics':[{'id':8,'name':'Devenez le Product Owner de notre retour d�exp�rience'}]},		
		{'id':10,'companyname':'',bio:'Anne Laure aide les �quipes de d�veloppement logiciel � construire de la valeur, en temps voulu, avec plaisir et en adoptant un rythme durable. Elle apporte cette aide en formant les �quipes aux m�thodes de gestion de projet et aux pratiques d\'ingenierie logicielle telles que Scrum et XP, en les coachant et en codant avec elles.','name':'Dalban Anne-Laure','topics':[{'id':8,'name':'Devenez le Product Owner de notre retour d�exp�rience'}]},				
		{'id':11,'companyname':'SAMSE','bio':'Arnaud Benistant est scrummaster au sein du groupe SAMSE. Pr�sent dans la societ� depuis presque 10 ans, il a particip� � la construction du syst�me d\'information du groupe en tant qu\'ing�nieur puis en tant que scrummaster depuis 2 ans. Passionn� par l\'agilit�, il fait partager son experience sur le blog "Ca Scrum ! ".','name':'Benistant Arnaud','topics':[{'id':11,'name':'La session dont vous �tes le h�ros !'}]},		
		{'id':12,'companyname':'ut7','bio':'Emmanuel Etasse est coach, formateur  et associ� de la soci�t� \/ut7. Il aide les organisations de d�veloppement logiciel � devenir des lieux o� r�sultats, qualit� de vie et plaisir, coexistent de fa�on durable.  Passionn� de programmation, il a 14 ans d�exp�rience dans l\�industrie du logiciel, dont 6 ans dans la mise en �uvre et l�accompagnement des approches agiles (�diteurs logiciels, PME, DSI, grands comptes�).  Seul formateur scrum.org en France, Emmanuel enseigne Scrum � l�Ecole de Management des Syst�me d\�Information � Grenoble. Emmanuel est aussi membre actif et cofondateur du Club Agile Rh�ne Alpes.','name':'Etasse Emmanuel','topics':[{'id':11,'name':'La session dont vous �tes le h�ros !'}]},			
		{'id':13,'companyname':'','bio':'Emmanuel agit en tant qu\�accompagnateur d��quipes, animateur de r�unions, formateur, programmeur extr�me, codexhibitionniste et agitateur public. Par le biais d\'armes non-conventionnelles, il aide les �quipes produisant du logiciel � �tre plus efficaces dans leur travail, plus fi�res de leurs r�sultats et plus heureuses en g�n�ral. Emmanuel est un sp�cialiste de la gestion de projet incr�mentale, des structures �mergeantes et des espaces de co-apprentissage. Il s\'int�resse aussi de mani�re d�raisonnable � la programmation fonctionnelle en g�n�ral et � Haskell en particulier. Un orateur r�gulier � de nombreuses conf�rences sur l\�Agilit�, Emmanuel organise �galement la conf�rence annuelle Agile Open France. Il est l\�un des fondateurs du Dojo de d�veloppement de Paris, et un de ses membres assidus depuis sa cr�ation il y a six ans. Emmanuel est un des associ�s de la soci�t� \/ut7.','name':'Gaillot Emmanuel','topics':[{'id':13,'name':'Un Kata Marrant'}]},
		{'id':14,'companyname':'ut7','bio':'"Polyglote, accro au dernier degr� des tests automatis�s, c�l�bre pour ses sessions endiabl�es au Dojo D�veloppement de Paris, Jonathan est un programmeur dans l\'�me. Il d�veloppe du logiciel depuis plus de dix ans, mais sa lecture du livre ""XP explained"" en 2004 a profond�ment chang� sa mani�re d\'appr�hender le m�tier de d�veloppeur - et ce n\'�tait que le d�but. Jonathan est � la recherche constante d\'occasions de montrer, partager et vivre pleinement la joie qu\'apporte l\'acte de programmation. Il est l\'un des associ�s de \/ut7.','name':'Perret Jonathan','topics':[{'id':13,'name':'Un Kata Marrant'}]},
		{'id':15,'companyname':'AgileToYou','bio':'Dipl�m� de l\�Ensimag en 1989, Alexandre d�couvre l\�Agilit� en 2004 et prend en charge la promotion de l\�Agilit� en Europe, Asie et Inde pour Yahoo International de 2005 � 2009. D�but 2009, Alexandre d�cide de cr�er la soci�t� AGILETOYOU pour former et accompagner de nombreux clients d�sireux de devenir Agile (Orange, EDF, Total, Schneider, Thales, Samse, BBC �). Alexandre est de plus un orateur r�gulier des conf�rences nationales et pr�side le CARA (Club Agile Rh�ne Alpes) qui organise Agile Grenoble le 24 novembre 2011 ou plus de 500 personnes sont attendues.','name':'Boutin Alexandre','topics':[{'id':15,'name':'Des Jeux Agiles pour apprendre'}]},
		{'id':16,'companyname':'Persistent Systems','bio':'Chimiste de formation, Matthieu est Product Owner au sein de Persistent Systems depuis 2007 sur divers projets de logiciels scientifiques. Il travaille en m�thode agile depuis 6 ans et a particip� � leur mise en place comme client embarqu� au sein de l\��quipe de d�veloppement puis comme Product Owner.','name':'Gironnet Matthieu','topics':[{'id':16,'name':'D�monstration \/ Kata BDD sur un logiciel pilotant un instrument'}]},
		{'id':17,'companyname':'Persistent Systems','bio':'Johanny  est d�veloppeur au sein de Persistent Systems depuis plusieurs ann�es. Travaillant sur des logiciels scientifiques dans diverses �quipes, il travaille en m�thode agile depuis 5 ans. Il utilise quotidiennement le BDD depuis 1 an.','name':'Bergeron Johanny','topics':[{'id':16,'name':'D�monstration \/ Kata BDD sur un logiciel pilotant un instrument'}]},
		{'id':18,'companyname':'Axway','bio':'','name':'Mack Adams','topics':[{'id':18,'name':'Cartographie agile de la gestion des produits'}]},
		{'id':19,'companyname':'Morisseau Consulting','bio':'De formation Ing�nieur ENSTA et architecte naval, Laurent MORISSEAU a travaill� plus de quinze ans dans l\'ing�nierie logiciel. Actuellement g�rant fondateur de la soci�t� Morisseau Consulting, il accompagne les entreprises et les �quipes qui souhaitent �voluer vers l\'agilit� (consulting, formation, coaching) et le Kanban. Il est l\'un des sp�cialistes en France de l\'Agilit�, seul fran�ais certifi� CSC (Certified Scrum Coach) avec plus de deux ans d�exp�rience en Kanban sur des projets significatifs. Il propose les premiers retours d�exp�rience sur le sujet � la conf�rence Agile 2010, formalise ses connaissances avec David Anderson, le p�re du Kanban. Depuis il anime des ateliers Kanban r�guli�rement et propose la seule formation en Fran�ais sur le sujet.','name':'Morisseau Laurent','topics':[{'id':19,'name':'Kanban, un tour d\'horizon'}]},
		{'id':20,'companyname':'','bio':'51 ans - Consultant et entrepreneur, j\'ai altern� la Direction op�rationnelle de PMI ind�pendantes ou de filiales de groupes avec des interventions de conseil aupr�s de dirigeants d\'entreprises. Intervenant r�gulier � l\'Ecole Nationale des Ponts et Chauss�es et � Grenoble Ecole de Management, j\'appr�cie de partager mon exp�rience sur le th�me de la performance globale des organisations, leur agilit� �tant ma principale pr�occupation.','name':'Fleurat Jacques','topics':[{'id':20,'name':'Agilit� et approche syst�mique du risque'}]},
		{'id':21,'companyname':'Google','bio':'','name':'Hunter Susan','topics':[{'id':21,'name':'"It\�s What You Don\�t Do That Counts'}]},
		{'id':22,'companyname':'Moodys Analytics','bio':'','name':'Megard Cyril','topics':[{'id':21,'name':'It\�s What You Don\�t Do That Counts'}]},
		{'id':23,'companyname':'','bio':'Claude a cr�� sa soci�t� de conseil en 1994. Depuis 2005, il se consacre � Scrum et aux m�thodes agiles, en aidant les entreprises � les appliquer. Impliqu� dans la communaut� agile, il est Pr�sident de la SigmaT, membre du French SUG, membre fondateur de la F�d�ration Agile et Product Owner du logiciel Open Source iceScrum. Il est l\'auteur d�un blog de r�f�rence sur Scrum (Scrum, Agilit� et rock\'n roll) et du premier livre sur Scrum en fran�ais (Scrum, le guide pratique de la m�thode agile la plus populaire).','name':'Aubry Claude','topics':[{'id':23,'name':'"(ice)Scrum, agilit� et rock\'n roll'}]},
		{'id':24,'companyname':'Kagilum','bio':'','name':'Barrier Vincent','topics':[{'id':24,'name':''},{'id':23,'name':'"(ice)Scrum, agilit� et rock\'n roll'}]},
		{'id':25,'companyname':'','bio':'Jean-Philippe LECLERE et Josquin LOUVIER sont avocats sp�cialis�s dans le droit des nouvelles technologies et notamment dans le conseil et le contentieux informatique. Ils interviennent r�guli�rement dans des dossiers impliquant l�utilisation des m�thodes agiles.','name':'Leclere Jean-Philippe','topics':[{'id':25,'name':'La contractualisation d�un projet Agile : enjeux et pi�ges'}]},
		{'id':26,'companyname':'','bio':'Jean-Philippe LECLERE et Josquin LOUVIER sont avocats sp�cialis�s dans le droit des nouvelles technologies et notamment dans le conseil et le contentieux informatique. Ils interviennent r�guli�rement dans des dossiers impliquant l�utilisation des m�thodes agiles.','name':'Louvier Josquin','topics':[{'id':25,'name':'La contractualisation d�un projet Agile : enjeux et pi�ges'}]},
		{'id':27,'companyname':'Schneider Electric','bio':'Chef de projet logiciel (PC software) durant dix ans dans un d�partement de recherche d�une soci�t� p�troli�re puis au sein de la division Marketing de Schneider Electric Responsable m�thodes et outils durant six ans au sein du service Customer Software & eBusiness de Schneider Electric. Actuellement expert processus de d�veloppement logiciel et qualimetire dans la division Strat�gie et innovation de Schneider Electric. Comp�tences: �CMMI improvement leader (Our department reached CMMI level 3 in 2006) �ITIL (Certified itSMF in 2008) �Certified Scrum Master (2010)','name':'Dondey Herv�','topics':[{'id':27,'name':'Agile Offer Creation program in Schneider Electric'}]},
		{'id':28,'companyname':'Schneider Electric','bio':'','name':'Bergmann Erick','topics':[{'id':27,'name':'Agile Offer Creation program in Schneider Electric'}]},		
		{'id':29,'companyname':'ChangIT','bio':'','name':'Martinsson Johan','topics':[{'id':29,'name':'Ma�triser le legacy avec Mikado'}]},
		{'id':30,'companyname':'','bio':'','name':'Moquillon Miguel','topics':[{'id':29,'name':'Ma�triser le legacy avec Mikado'}]},
		{'id':31,'companyname':'Agilarium  ','bio':'Fabrice est passionn� par l\'Agile : Scrum et Kanban en particulier. Il est impliqu� dans des communaut�s telles que le Scrum User Group bordelais, le Club Lean Aquitaine et la SigmaT. R�guli�rement, il publie un billet de r�trospective ou une traduction sur son blog Agilarium.fr. Il est consultant en Agilit� chez Sopra Group.','name':'Aimetti Fabrice','topics':[{'id':31,'name':'Agile Portfolio'}]},
		{'id':32,'companyname':'AKQA','bio':'Sophie Freiermuth est Architecte Exp�rience Utilisateur dans l�une des plus prestigieuses agences cr�atives digitales, reconnue pour sa capacit� technique autant que pour sa cr�ativit�. Sophie collabore au quotidien avec les �quipes de d�veloppement sur des projets web, App et mobile pour des marques globales et une audience internationale. Passionn�e par le challenge de cr�er une exp�rience positive pour des millions d\'utilisateurs ainsi que par les processus de d�veloppement et de travail, elle a travaill� en Agile au sein d\'Orange UK, Nokia et AKQA.','name':'Freiermuth Sophie','topics':[{'id':32,'name':'L\'architecte de l\�exp�rience utilisateur, un membre cl� des projets front end Agile\/Lean: pr�sentation du r�le, conseils de collaboration.'}]},
		{'id':33,'companyname':'','bio':'Pierre Vachon est un Coach agile et organisationnel ayant travaill� plusieurs ann�es au Canada et aux �tats-Unis notamment en tant que Scrum Master et Scrum Coach. En france depuis quatre ans, il aide les grandes entreprises dans des projets de transformation et de transition vers les m�thodes agiles. Il fait souvent de la formation Scrum, XP, Kanban, et Lean, et travaille �galement avec les managers en tant que consultant afin d\'optimiser et d\'am�liorer la structure et l\'organisations des projets. Monsieur Vachon poss�de une formation en g�nie logiciel, en gestion de projets, et en administration des affaires. Il est certifi� Scrum Master et Scrum Professional. Vous pouvez contacter monsieur Vachon directement � l\'adresse suivante : pierre.vachon@gmail.com','name':'Vachon Pierre','topics':[{'id':33,'name':'Une bonne histoire !'}]},
		{'id':34,'companyname':'','bio':'D�veloppeur, chef de projet, directeur technique adjoint, operations manager : plus de 20 ans dans l\��dition logicielle. A v�cu l\�agilit� au quotidien - mise en place, coaching de scrum masters et product owners - pendant 4 ans, sur des projets industriels. Passionn� par la cr�ativit�, le d�veloppement logiciel, le management et... la montagne.','name':'Vall�e Thierry','topics':[{'id':34,'name':'Story Map : objectif feed-back !'}]},
		{'id':35,'companyname':'','bio':'Apr�s quelques ann�es en tant que d�veloppeur, Emilie Franchomme s\�est ensuite tourn�e vers la gestion de projets et l\�assistance � ma�trise d�ouvrage. Product Owner pendant 3 ans, elle est aujourd\'hui Scrum Master. Elle est passionn�e par Scrum et les m�thodologies Agiles, et s\�int�resse � tout ce qui peut permettre de d�livrer du logiciel de qualit�, satisfaisant les utilisateurs, tout en permettant aux �quipes de s\��panouir.','name':'Franchomme Emilie','topics':[{'id':35,'name':'R�trospectives\�lab : d�cantation'}]},
		{'id':36,'companyname':'Sogeti','bio':'Leader sur les projets d\'innovation et acteur majeur sur l\'agilit� et plus particulierement avec scrum, il est intervenu � la fois en tant que product owner et scrum master sur diff�rents projets de developpement. ','name':'Bazzaro Fabrice','topics':[{'id':36,'name':'Scrum et innovation'}]},
		{'id':37,'companyname':'Sogeti','bio':'','name':'Barthe Elodie','topics':[{'id':36,'name':'Scrum et innovation'}]},
		{'id':38,'companyname':'AGILESSENCE','bio':'Je suis formateur, consultant et coach Agile. Dans l\�informatique depuis plus de vingt ans je suis intervenu dans de nombreux domaines du SI  en particulier  pendant 6 ans au service du e-commerce europ�en chez Hewlett Packard. Aujourd\'hui  j\'accompagne les organisation dans le XXI�me si�cle. Je porte l\'Agilit� en tant que philosophie au service de l\'entreprise et mode d\'organisation des projets. ','name':'Jagodzinski Jean-Fran�ois','topics':[{'id':38,'name':'Ce que vous devez savoir � propos de la contractualisation Agile'}]},
		{'id':39,'companyname':'Thales','bio':'Apr�s une th�se dans le domaine des Documents Multim�dia, Laurent a rejoint Kelkoo comme d�veloppeur java avanc�. Passionn� par l\'int�gration continue et les outils d\'analyse de code, il a travaill� a mettre en place une plateforme d�int�gration chez Kelkoo puis Yahoo. Depuis 2 ans il aide a la mise en place d\'une plateforme au service des �quipes Agile d\'Agilent\/PersistentSAS.','name':'Gardais Guillaume','topics':[{'id':39,'name':'Git au quotidien'}]},
		{'id':40,'companyname':'Persistent SAS','bio':'','name':'Tardif Laurent','topics':[{'id':39,'name':'Git au quotidien'}]},
		{'id':41,'companyname':'La boite � Outils','bio':'Grenoblois, montagnard citadin, Directeur informatique et membre de la DG de � La boite � Outils �, groupe SAMSE. Inspir� par les pratiques AGILE (XP, SCRUM, Lean) depuis 2005. Je suis aussi passionn� par le management et pr�sident du groupe GERME* � DOJO � de Grenoble. * Groupes d\�entrainement et de r�flexion au Management des Entreprises. Les courants de pens�s suivants m�influence aussi fortement : � L\��l�ment humain� de Will Schutz , � La spirale dynamique � de Clare W Graves, � La vision Int�grale � de Ken Wilber','name':'Dufau-Jo�l Fr�d�ric','topics':[{'id':41,'name':'Comment rendre nos entreprises Agile ?'}]},
		{'id':42,'companyname':'Groupe Open','bio':'Directeur de projets informatiques chez OPEN (TEAMLOG) � Grenoble, Jean dirige des projets et des TMA en mode agile et enseigne en tant que Professeur Affili� � Grenoble Ecole de Management. Jean est �galement r�f�rent agile r�gional et coach agile au sein d�OPEN, en charge de la diffusion de l�agilit� et du partage des pratique. Plus sur mon parcours sur viadeo et linkedin.','name':'Dupuis Jean','topics':[{'id':42,'name':'REX Bascule en agile d\'un portefeuille de projets et TMA'}]},
		{'id':43,'companyname':'SNCF  ','bio':'Christophe DUPLAIX est PO SNCF sur le p�rim�tre des trains communicants et de la plateforme PSCS sol-bord de communication entre trains et applications m�tiers','name':'Duplaix Christophe','topics':[{'id':42,'name':'REX Bascule en agile d\'un portefeuille de projets et TMA'}]},
		{'id':44,'companyname':'Maison de l\'Initiative  ','bio':'* Formation et rencontre avec les concepteurs de l\'XP d�but 2000  * Fondateur de l\'association Extreme Programming France, 2000 * Les premiers articles (article dans Langages et Syst�mes, 01 Informatique...) en fran�ais sur ce ph�nom�ne,2000 * Auteur de � Ma�triser les projets avec l\'Extreme Programming �, 2004* Conf�rences et s�minaires ""agiles"" (2000 � aujourd\'hui)* Membre du Conseil de l\'asso SigmaT. Cette association bas�e � Toulouse a pour but de promouvoir l\'agilit� dans le Sud-Ouest * Membre de la F�d�ration agile. voir aussi http://etreagile.thierrycros.net/home/?category/Qui-est-Etre-Agile"','name':'Cros Thierry','topics':[{'id':44,'name':'Manager agile : concr�tement'}]},
		{'id':45,'companyname':'La bo�te � Outils','bio':'"Responsable �quipe de chefs de projet fonctionnel (Product Owner) avec un �tat d\'esprit Agile. Pratique de l\'agilit� depuis 2005 (XP, SCRUM, LEAN/KANBAN)"','name':'Cuttaz J�r�me','topics':[{'id':45,'name':'Jouer pour �tre plus Agile'}]},
		{'id':46,'companyname':'La bo�te � Outils','bio':'','name':'Joseph C�dric','topics':[{'id':45,'name':'Jouer pour �tre plus Agile'}]},
		{'id':47,'companyname':'La bo�te � Outils','bio':'Chef de projet et Scrumaster. Pratique l\'agilit� depuis 2005 (XP, SCRUM, LEAN/KANBAN)','name':'Lesne Vincent','topics':[{'id':45,'name':'Jouer pour �tre plus Agile'}]},
		{'id':48,'companyname':'Orange','bio':'Je suis responsable depuis 4 ans de promouvoir l\�agilit�, la � d�finir � pour Orange, l\�industrialiser et accompagner op�rationnellement les projets volontaires, j�ai pu exp�rimenter � peu pr�s tous les pi�ges li�s � l\�introduction de l�agilit� dans une entreprise de grande taille.','name':'Genin R�my','topics':[{'id':48,'name':'Retour sur 4 ans d\�industrialisation de l\�agilit� chez Orange'}]},
		{'id':49,'companyname':'Thales Services','bio':'Coach et formatrice agile depuis plus d\'un an, je tiens �galement � garder un pied dans des projets et �quipes agiles via un r�le de Scrum Master. J\'ai coach� et form� diff�rents projets, dans diff�rents contextes et avec des personnes tr�s diff�rentes. Je contribue �galement au CARA et � Agile Grenoble depuis leurs cr�ations et me lance depuis l\'ann�e derni�re dans des conf�rences agiles. Ces diff�rentes exp�riences apportent toujours plus d\'eau � mon moulin et me permettent d\'apprendre en permanence. L\'agilit� est pour moi une v�ritable fa�on d\'�tre et de travailler, plus humaine, plus logique et plus efficace, et qui me correspond totalement.','name':'Hanot Laurence','topics':[{'id':49,'name':'Y a t-il un pilote dans le projet ?'}]},
		{'id':50,'companyname':'SOGILIS','bio':'','name':'Zwiebel Etienne','topics':[{'id':50,'name':'Externalisation agile d\'un projet avionique : les ingr�dients d\'un succ�s'}]},
		{'id':51,'companyname':'Thales','bio':'','name':'Bonzy Jonathan','topics':[{'id':51,'name':'Symphonie pour PHP industrialis� en agilit� majeure'}]},
		{'id':52,'companyname':'Best Of Media','bio':'','name':'Nazarian Marc','topics':[{'id':51,'name':'Symphonie pour PHP industrialis� en agilit� majeure'}]},
		{'id':53,'companyname':'Best Of Media','bio':'','name':'Huguet Bernard','topics':[{'id':51,'name':'Symphonie pour PHP industrialis� en agilit� majeure'}]},
		{'id':54,'companyname':'Agence Interactive','bio':'Sp�cialiste en architecture de syst�mes Web et fort de plus de 20 ans d\'exp�rience en ing�nierie logicielle et management d\'�quipes et de projets, j�ai acquis plusieurs exp�riences sur des projets open-source d\'envergure dont des serveurs d\'application et applications B2C/B2B dans les secteurs du tourisme, de l\'�v�nementiel, du management et de l\'enseignement. J�anime r�guli�rement des conf�rences ainsi que des formations dans les domaines de l\'Agilit� et de l\'Open-source. Impliqu� depuis plusieurs ann�es dans le d�veloppement de startups du Web2.0 en France et en Californie, j�ai rejoint en 2009 Agence Interactive, en tant que Directeur Technique Associ�, pour les accompagner dans la conduite du changement vers l\�Agilit�. ','name':'Ney Christophe','topics':[{'id':54,'name':'KANBAN et SCRUM au sein d\'une agence digitale'}]},
		{'id':55,'companyname':'Persistent SAS','bio':'Product owner at Persistent Systems - 2011 Product OwnerAgilent Technologies -2010 Junior project manager Varian 2002 � November 2010 (8 years)','name':'Coelho Isabelle','topics':[{'id':55,'name':'Nos Product Owner (Pos), ils ressemblent � quoi aujourd\�hui ?'}]},
		{'id':57,'companyname':'Persistent SAS','bio':'Product Owner (Business Analyst) at Persistent Systems 2011 Product owner (Business Analyst) at Agilent Technologies 2010 Product owner (Business Analyst) at Varian, Inc. October 2007 � May 2010 (2 years 8 months) Grenoble Area, France','name':'Remont Solange','topics':[{'id':55,'name':'Nos Product Owner (Pos), ils ressemblent � quoi aujourd\�hui ?'}]},
		{'id':59,'companyname':'Optimhommes','bio':'-Titulaire d\'un DESS en strat�gie RH, DU de sociologie des organisations en mutation, -13 ans exp�rience en GRH. ex DRH et membre du Comit� de direction soci�t� RTSS France (105p - 2 �tablissements) -Coach professionnel depuis 2010 -Enseignant Grenoble Ecole de Management (GEM) en Strat�gie et en Agilit� -Fondateur et Co-dirigeant de la soci�t� OptimHommes ','name':'Tarradas Thomas','topics':[{'id':59,'name':'Agilit� et GRH'}]},
		{'id':61,'companyname':'Enalean','bio':'Manuel est un le directeur technique et co-fondateur de la soci�t� Enalean. Il pratique l\'Agilit� (Scrum & Kanban) depuis 4 ans et baigne dans la communaut� Libre (Open Source) depuis 10 ans.','name':'Vacelet Manuel','topics':[{'id':61,'name':'L\'agilit� support au co-d�veloppement'}]},
		{'id':62,'companyname':'Itecor','bio':'','name':'Wasitova Silvana','topics':[{'id':62,'name':'Overcoming Distances: Scrum with Distributed Teams'}]}	
		];					
				Ext.getCmp('speakerList').getStore().loadData(speakers_data);
				Ext.getBody().unmask();	
        
	}
	
});
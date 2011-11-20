cfunited.App = Ext.extend(Ext.TabPanel,{
	id:'tabpanel',
	fullscreen:true,
	ui:'light',
	tabBar: {
		centered:true,
		dock:'bottom',
		layout: {pack:'center'}
	},
	animation:'slide',
	scroll:false,
	monitorOrientation:true,
	initComponent: function(){		
		
		// components
		this.schedule = new cfunited.ui.Schedule();
		this.speakers = new cfunited.ui.Speakers();		
		this.twitter = new cfunited.ui.Twitter();
		this.more = new cfunited.ui.More();
				
		this.items = [
			this.schedule,
			this.speakers,
			this.twitter,
			this.more	
		];
		
		cfunited.App.superclass.initComponent.apply(this,arguments);
		
		// events
		this.schedule.on('activate',this.onScheduleActivate,this);
		this.speakers.on('activate',this.onSpeakersLoad,this);
		this.twitter.on('activate',this.onTwitterLoad,this);
		
	},
	
	getTitleBar: function(){
		return this.titleBar;
	},
	
	onScheduleActivate: function(){
		this.schedule.onLoad();		
	},
	
	onSpeakersLoad: function(){
		this.speakers.onLoad();
	},
	
	onTwitterLoad: function(){
		this.twitter.onLoad();
	}
			
});
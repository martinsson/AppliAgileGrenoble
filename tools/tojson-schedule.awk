BEGIN {i=0}
{
  speakerName=$2
  speakerId=$4
  sessionName=$5
  sessionDesc=$6
  sub(/^\"/,"",sessionName)
  sub(/\"$/,"",sessionName)
  sub(/^\"/,"",sessionDesc)
  sub(/\"$/,"",sessionDesc)
  sessionId=$7
  location=$8
  seats=$9
  begin=$10
  end=$11
  ampm=$12
 #{'schedule': [{'seats':0,'starttime':'08:00','endtime':'08:45',
 #'topic':{'id':50,'name':'Accueil autour d\'un café'},'speakers':[{'id':50,'name':'CARA'}],
#				'location':'Accueil'}],
#						'date':'AM'},	
  printf("{'schedule': [{'seats':%d,'starttime':'%s','endtime':'%s', 'topic':{'id':%d,'name':'%s'},'speakers':[{'id':%d,'name':'%s'}], 'location':'%s'}],'date':'%s'},\n",
	seats,
	begin,
	end,
	sessionId,
	sessionName,
	speakerId,
	speakerName,
	location,
	ampm)	
  i++
}

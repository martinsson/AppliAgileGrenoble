BEGIN {i=0}

{

#session_data[5] =
#{'id':5,'schedule':[{'seats':450,'starttime':'08:45','endtime':'09:00','date':'AM','location':'Auditorium Pelvoux'}],'description':'...','name':'Le mot des organisateurs','speakers':[{'id':50,'name':'CARA'}]};
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
  
  printf("session_data[%d] = {'id':%d,'schedule':[{'seats':%d,'starttime':'%s','endtime':'%s','date':'2011-11-24','location':'%s'}],'description':'%s','name':'%s','speakers':[{'id':%d,'name':'%s'}]};\n",
    sessionId,
    sessionId,
    seats,
    begin,
    end,
    location,
    sessionDesc,
    sessionName,
    speakerId,
    speakerName)

  
  i++
}

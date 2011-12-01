BEGIN {i=-1; 
  split("Auditorium,Makalu,Kilimandjaro 1-2,Kilimandjaro 3-4,Mont Blanc 1-2-3,Mont Blanc 4,Cervin,Everest", salles, ","); 
  split("530,110,50,50,75,25,40,40", seats, ",")
  split("10:00, 11:10, 14:45, 16:45, 17:25", starttimes, ", ")
  split("10:45, 12:05, 15:40, 17:10, 18:20", endtimes, ", ")
}  
{ salle=salles[(i % 8)+1]
  seat=seats[(i % 8)+1]
  begin=starttimes[int(i / 8)+1]
  end=endtimes[int(i / 8)+1]
  print $0";"(i+1)";"salle";"seat";"begin";"end }
{i++}


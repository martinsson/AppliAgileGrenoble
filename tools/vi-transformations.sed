# supprimer lignes vides
s/$\n^$\n//               
#supprimer retours à la ligne avant guillemets
s/$\n\"/\"/

#echapper apostrofs
s/'/\\'/g

#tout retour à la ligne dont la ligne suivante ne commence pas par un chiffre
s/$\n\([^0-9]\)/\. \1/

# remplacer separateurs en virgule par point-virgule
s/\([^"]*\)\,\([^"]*\)\,\([^"]*\)\,\([^"]*\)\,\([^"]*\)\,/\1\;\2\;\3\;\4\;\5\;/
s/\([^"]*\)\,\([^"]*\)\,\([^"]*\)\,\([^"]*\)\,/\1\;\2\;\3\;\4\;/
s/"\,"/"\;"/

#remp premier virgule par point-virgule
#s/\(\d\+\)\,/\1\;/

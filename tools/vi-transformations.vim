# supprimer lignes vides
:%s/$\n^$\n//g
#supprimer retours à la ligne avant guillemets
:%s/$\n\"/\"/g

#echapper apostrofs
:%s/'/\\'/g

#tout retour à la ligne dont la ligne suivante ne commence pas par un chiffre
:%s/$\n\([^0-9]\)/\. \1/g

# remplacer separateurs en virgule par point-virgule
:%s/\(\d\+\)\,\([^"]*\)\,\([^"]*\)\,\(\d\+\)\,\([^"]*\)\,/\1\;\2\;\3\;\4\;\5\;/
:%s/\(\d\+\)\,\([^"]*\)\,\([^"]*\)\,\(\d\+\)\,\(.*\)"\,"/\1\;\2\;\3\;\4\;\5"\;"/
#%s/"\,"/"\;"/g

#remp premier virgule par point-virgule
#:%s/\(\d\+\)\,/\1\;/gc

#delete lines that only contains speakers
:g/^\d.*\d$/d

## Great Vinyl Exchange
## Random Match Up MVP Procedure
## Author: Daniel Ley
## Version 1: 4/5/16
## Version 2: 6/20/16
## Version 3: 4/11/17 - Addition of Will Wagner, Perry Krum was added in March '17
## Last Time Updated: 11/05/2018

from random import randint

# All member of the groups
members = ["Jake Heninger","Nate Ley", "Matt Bata","Adam Hernandez","Adam Malcore","DJ Ley","Perry Krum","Will Wagner"]
# Members who can send a vinyl
sendList = ["Jake Heninger","Adam Hernandez", "Matt Bata","Adam Hernandez","Adam Malcore","DJ Ley","Perry Krum","Will Wagner"]
# All members that can recieve a vinyl
recList = ["Jake Heninger","Nate Ley", "Matt Bata","Adam Hernandez","Adam Malcore","DJ Ley","Perry Krum","Will Wagner"]
# History of past send/recieve matchups - covers the last month
history = [[("Perry Krum", "Will Wagner"),("Adam Hernandez", "Adam Malcore"),("Adam Malcore", "Adam Hernandez"),("Jake Heninger", "Matt Bata"),("Matt Bata", "DJ Ley"),("Nate Ley", "Jake Heninger"),("Will Wagner","Nate Ley"),("DJ Ley", "Perry Krum")],
          [("Jake Heninger", "DJ Ley"),("Perry Krumenacher", "Matt Bata"),("Will Wagner", "Adam Hernandez"),("Adam Malcore", "Jake Heninger"),("Perry Krumenacher", "Matt Bata"),("DJ Ley", "Will Wagner"),("Adam Hernandez", "Nate Ley"),("Nate Ley", "Adam Malcore")],
          [("Adam Malcore", "Will Wagner"),("Adam Hernandez", "Matt Bata"),("Nate Ley", "Adam Hernandez"),("DJ Ley", "Nate Ley"),("Matt Bata", "Jake Heninger"),("Perry Krumenacher", "DJ Ley"),("Will Wagner", "Adam Malcore"),("Jake Heninger", "Perry Krumenacher")],
          [("Nate Ley", "Will Wagner"),("DJ Ley", "Matt Bata"),("Jake Heninger", "Adam Hernandez"),("Adam Malcore", "Nate Ley"),("Will Wagner", "Jake Heninger"),("Adam Hernandez", "DJ Ley"),("Perry Krumenacher", "Adam Malcore"),("Matt Bata", "Perry Krumenacher")]]

'''
    May
    ("Matt Bata","DJ Ley"),("Adam Malcore","Nate Ley"),("Nate Ley","Adam Malcore"),("Adam Hernandez","Jake Heninger"),("Jake Heninger","Matt Bata"),("DJ Ley","Adam Hernandez")
    June
    ("Adam Hernandez","Nate Ley"),("Adam Malcore","DJ Ley"),("DJ Ley","Adam Malcore"),("Matt Bata","Jake Heninger"),("Jake Heninger","Adam Hernandez"),("Nate Ley","Matt Bata")
    July - Skip
    August
    ("Adam Hernandez","Matt Bata"),("Adam Malcore","Adam Hernandez"),("DJ Ley","Jake Heninger"),("Matt Bata","Adam Malcore"),("Jake Heninger","Nate Ley"),("Nate Ley","DJ Ley")

    2017
    December
    ("Jake Heninger", "Perry Krum"),("Perry Krum", "Adam Malcore"),("Adam Hernandez", "Jake Heninger"),("Nate Ley", "DJ Ley"),("Matt Bata","Will Wagner"),("Will Wagner", "Adam Hernandez"),("DJ Ley", "Matt Bata"),("Adam Malcore","Nate Ley")

    2018
    January
    ("Perry Krum", "Adam Hernandez"),("Adam Hernandez", "Will Wagner"),("Jake Heninger", "Nate Ley"),("Adam Malcore", "DJ Ley"),("DJ Ley", "Jake Heninger"),("Matt Bata", "Adam Malcore"),("Nate Ley", "Perry Krum"),("Will Wagner","Matt Bata")
    March
    ("Perry Krum", "Will Wagner"),("Adam Hernandez", "Adam Malcore"),("Adam Malcore", "Adam Hernandez"),("Jake Heninger", "Matt Bata"),("Matt Bata", "DJ Ley"),("Nate Ley", "Jake Heninger"),("Will Wagner","Nate Ley"),("DJ Ley", "Perry Krum")
    June
    ("Jake Heninger", "DJ Ley"),("Perry Krumenacher", "Matt Bata"),("Will Wagner", "Adam Hernandez"),("Adam Malcore", "Jake Heninger"),("Perry Krumenacher", "Matt Bata"),("DJ Ley", "Will Wagner"),("Adam Hernandez", "Nate Ley"),("Nate Ley", "Adam Malcore")
    July
    ("Adam Malcore", "Will Wagner"),("Adam Hernandez", "Matt Bata"),("Nate Ley", "Adam Hernandez"),("DJ Ley", "Nate Ley"),("Matt Bata", "Jake Heninger"),("Perry Krumenacher", "DJ Ley"),("Will Wagner", "Adam Malcore"),("Jake Heninger", "Perry Krumenacher")
    August
    ("Nate Ley", "Will Wagner"),("DJ Ley", "Matt Bata"),("Jake Heninger", "Adam Hernandez"),("Adam Malcore", "Nate Ley"),("Will Wagner", "Jake Heninger"),("Adam Hernandez", "DJ Ley"),("Perry Krumenacher", "Adam Malcore"),("Matt Bata", "Perry Krumenacher")
    November
    ("Adam Malcore", "Matt Bata"),("Adam Hernandez", "Will Wagner"),("Nate Ley", "DJ Ley"),("Perry Krumenacher", "Nate Ley"),("Nate Ley", "Perry Krumenacher"),("Jake Heninger", "Adam Malcore"),("Matt Bata", "Adam Hernandez"),("DJ Ley", "Jake Heninger")
    '''
matchUps = []

# While there are still people who need to send a vinyl, continue pairing them with someone
while(len(sendList) != 0):

    print "\nThis months CURRENT ITERATION match ups are: "
    for matchup in matchUps:
        print matchup[0] + " ---> " + matchup[1]

    # Boolean variable to maintain if the only person left in the send and reciev list are not the same person
    notSamePerson = False
    while(not notSamePerson):
        # Choose a random person to be the sender
        sender = sendList[randint(0,len(sendList)-1)]
        # Choose a random member to be reciever for that sender
        reciever = recList[randint(0,len(recList)-1)]
        print "Chosen sender " +sender
        print "Chosen Reciever " + reciever
        if(sender != reciever):
            notSamePerson = True
        else:
            #Restart the process. The only person left in both lists are the same person
            sendList = ["Jake Heninger","Nate Ley", "Matt Bata","Adam Hernandez","Adam Malcore","DJ Ley","Perry Krum","Will Wagner"]
            recList = ["Jake Heninger","Nate Ley", "Matt Bata","Adam Hernandez","Adam Malcore","DJ Ley","Perry Krum","Will Wagner"]
            matchUps = []
    monthCount = 0
    # Check to see if the matchup of the sender and reciever were in the past history of matchUps
    # If they were not a past matchup, then add them as a matchup for this grouping
    for month in history:
        if((sender,reciever) not in month):
            monthCount += 1
        else:
            print sender + " sent " + reciever + " a record in one of the last months"
            if(len(sendList)==1):
                #Restart The entire process. If we didn't it would enter endless loop
                sendList = ["Jake Heninger","Nate Ley", "Matt Bata","Adam Hernandez","Adam Malcore","DJ Ley","Perry Krum","Will Wagner"]
                recList = ["Jake Heninger","Nate Ley", "Matt Bata","Adam Hernandez","Adam Malcore","DJ Ley","Perry Krum","Will Wagner"]
                matchUps = []
    # If the match was not found in any of the last months, then the monthCount should equal
    # how many months are in the history, and for this Version 2, that would be 2 months
    # If this is the case then add this matchup to the current grouping.
    if(monthCount == len(history)):
        sendList.remove(sender)
        recList.remove(reciever)
        matchUps.append((sender,reciever))


print "\nThis months match ups are: "
for matchup in matchUps:
    print matchup[0] + " ---> " + matchup[1]

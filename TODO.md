* Credit https://mhw-db.com/ for data and typings
* Make sure prettier and eslint stuff is setup well, to warn about stuff I'm used to
* Add ability to further specify skill as "also" or "overwrite" so that you can have a list put together of all your
  skills
* Armor max defense stuff
* categorize skills
* rise armor set bonus resistance
* armor assets and crafting info?
* refactoring json data to remove embedded info from other "tables"?
* way to indicate that you're over-capping a skill?
* set bonuses in the armor searcher
* move current temp stuff in armor searcher to it's own builder

Searcher:

* optimize armors used to search by eliminating 100% worse options (as determined by skills, other factors could be
  different)
* for the above note, make it so that the user can specify exactly what armors are allowed during the search (e.g. ASS)
* progress bar?
* decorations
* set bonuses
* web workers?
* Athena's ASS has an interesting optimization that adds an armor to the list of armors to check if it has a certain
  number of slots, I think? Unclear exactly what the determining factor is, but some kind of optimization like that
  might be interesting to explore - could also add a feature to add any arbitrary armor to the list so that the user
  could further customize
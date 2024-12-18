# heap

## aim

Basically heap aims to be an online market place for scrap metal purchase and sale with tweaks for catalytic converter sale within the state of Maryland, as it is now regulated by law. The goal is to make a sticky app that makes it easy for someone to post a listing, browse and accept offers, and lookup the ratings and information of the business and people they're considering doing business with.

## tools

the idea right now is to use event driven architecture through AWS to log everything to a dynamo instance, send the necessary emails. I'm using React Native to design a project accessible in both android and ios. During development I'm using AppWrite to test DB calls while the actual frontend client is being built.

### Open Known Issues

1) Using appwrite atm but eventually createLocation should construct some sort of coordinate to be used for distance matching. Probably have to request long/lat from google.places or find some other library. This is the only issue that really dissuades me from event driven architecture as I feel like calculating distance for every listing in the feed (paginated) is best left to a backend, and may get costly if I'm using APIs.

1.a using google location now
1.b nominatim would allow me to run my own server with the location data, this can be done with aws later at a fairly decent cost
1.c consider running lat/lng by zip code. would not be as precise but it is not so important.

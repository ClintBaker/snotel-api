# Snotel Backend API

### Stuff to do
* Reset FirebaseDB to require authentication once testing is done.
### Ex:
`{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
`

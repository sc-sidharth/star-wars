# Audio Files

## Imperial March (Darth Vader's Theme)

To enable the Imperial March theme music in the application, you need to add the audio file:

### Steps to Add Audio:

1. **Download the Imperial March audio file** from a royalty-free source or use your own licensed copy
2. **Name it:** `imperial-march.mp3`
3. **Place it in:** `/public/audio/imperial-march.mp3`

### Recommended Sources:

- YouTube Audio Library (royalty-free music)
- FreePD.com (public domain music)
- Incompetech.com (Kevin MacLeod - royalty-free)
- Purchase from official Star Wars soundtracks

### File Requirements:

- **Format:** MP3
- **Recommended Length:** 2-3 minutes (it will loop automatically)
- **Recommended Bitrate:** 128-192 kbps
- **File Size:** Under 5MB for faster loading

### Alternative:

If you want to use a different Star Wars theme or music, simply replace the filename in:
`/src/components/layout/Header.jsx` (line 17)

```javascript
audioRef.current = new Audio("/audio/your-audio-file.mp3");
```

---

**Note:** Make sure you have the rights to use any music files. The Imperial March is copyrighted by Lucasfilm/Disney.

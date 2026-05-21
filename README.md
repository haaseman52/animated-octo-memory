# 🌍 Digital World Clock

A beautiful, responsive web application that displays the current time in multiple time zones simultaneously.

## ✨ Features

- ⏰ **Multiple Time Zones** - Display current time in various time zones
- 🌍 **Quick Add Buttons** - Pre-configured buttons for major cities
- 🔄 **Real-time Updates** - Updates every second
- 📅 **Full Date Display** - Shows day, date, and year for each timezone
- 🕐 **UTC Offset** - Displays timezone offset from UTC
- 💾 **Local Storage** - Saves your timezone selections
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- ✅ **Timezone Validation** - Prevents invalid timezone entries
- 🗑️ **Easy Management** - Remove timezones with a single click

## 🚀 Quick Start

1. Open `index.html` in your web browser
2. Click quick-add buttons for major cities, or
3. Enter a timezone in the input field and press Enter

## 📖 How to Use

### Adding Timezones

**Method 1: Quick Add Buttons**
- Click any of the pre-configured city buttons (New York, London, Tokyo, etc.)

**Method 2: Manual Entry**
- Type a timezone in the input field (e.g., `America/Los_Angeles`)
- Click "Add Timezone" or press Enter

### Removing Timezones
- Click the "Remove" button on any clock card

### Supported Timezone Format

Use IANA timezone identifiers:

**Americas:**
- `America/New_York`
- `America/Los_Angeles`
- `America/Mexico_City`
- `America/Toronto`
- `America/Sao_Paulo`

**Europe:**
- `Europe/London`
- `Europe/Paris`
- `Europe/Berlin`
- `Europe/Madrid`
- `Europe/Rome`
- `Europe/Moscow`

**Asia:**
- `Asia/Tokyo`
- `Asia/Shanghai`
- `Asia/Dubai`
- `Asia/Singapore`
- `Asia/Bangkok`
- `Asia/Hong_Kong`
- `Asia/Kolkata`

**Oceania:**
- `Australia/Sydney`
- `Australia/Melbourne`
- `Pacific/Auckland`
- `Pacific/Fiji`

**Africa:**
- `Africa/Cairo`
- `Africa/Johannesburg`
- `Africa/Lagos`

## 💾 Data Persistence

Your selected timezones are automatically saved to your browser's local storage. When you return to the application, your previously selected timezones will be restored.

## 📁 File Structure

```
├── index.html    # HTML structure
├── styles.css    # Styling and animations
├── script.js     # Clock logic and interactivity
└── README.md     # This file
```

## 🎨 Customization

### Change Color Scheme
Edit the gradient colors in `styles.css`:
```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Add More Quick Buttons
Add new buttons in `index.html`:
```html
<button class="btn btn-quick" data-tz="Asia/Bangkok">Bangkok</button>
```

### Modify Update Frequency
In `script.js`, change the interval (currently 1000ms = 1 second):
```javascript
setInterval(() => this.updateAllClocks(), 1000);
```

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technical Details

- **Vanilla JavaScript** - No dependencies
- **ES6 Classes** - Modern JavaScript syntax
- **CSS Grid & Flexbox** - Responsive layout
- **LocalStorage API** - Data persistence
- **Intl API** - Timezone handling

## 📝 License

Open source - feel free to use and modify!

## 🤝 Contributing

Feel free to fork and submit pull requests with improvements!

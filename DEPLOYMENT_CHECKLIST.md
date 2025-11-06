# 🚀 DEPLOYMENT CHECKLIST - გაჰოსტვის ინსტრუქცია

## ❗ პრობლემა
დამკვეთი ვერ ხედავს ცვლილებებს გაჰოსტილ ვერსიაზე, რადგან ცვლილებები არ არის დეპლოიმენტზე ატვირთული.

## ✅ რა უნდა გააკეთოთ:

### 1️⃣ **შეამოწმეთ რომელი ფაილები შეიცვალა**
```bash
git status
```

### 2️⃣ **დაამატეთ ყველა ცვლილება**
```bash
git add .
```

### 3️⃣ **დააკომიტეთ ცვლილებები**
```bash
git commit -m "Fix: Update Works component fonts, add social media links, fix footer links by language"
```

### 4️⃣ **დაპუშეთ GitHub/GitLab-ზე**
```bash
git push origin main
# ან თუ სხვა branch-ია:
# git push origin <branch-name>
```

### 5️⃣ **შეამოწმეთ Hosting Platform**

თუ იყენებთ **Vercel/Netlify/Render**:
- ავტომატურად დაიწყება rebuild
- დაელოდეთ 2-5 წუთს
- შეამოწმეთ deployment logs

თუ იყენებთ **Manual Hosting**:
```bash
npm run build
# შემდეგ ატვირთეთ build ფოლდერი სერვერზე
```

---

## 📝 დღეს გაკეთებული ცვლილებები:

### ✅ Works კომპონენტი
- დაემატა "ВСЕ {{count}} УПРАЖНЕНИЯ →" ლინკი ყველა სექციაში
- გამოსწორდა ფონტები (სათაური Bowler, ლინკი PT Sans)
- წაიშალა ზედმეტი "View all" ლინკი

### ✅ Footer სოციალური ქსელები
**რუსული (ru):**
- VK: https://vk.com/ghrsgroup
- Telegram: https://t.me/ghrsgroup
- YouTube: https://www.youtube.com/@ghrsgroup

**ინგლისური (en):**
- Instagram: https://instagram.com/ghrs_group
- Facebook: https://www.facebook.com/ghrs.gr/
- Twitter: https://twitter.com/ghrs_group
- LinkedIn: https://www.linkedin.com/in/ghrs-group
- YouTube: https://www.youtube.com/@ghrsgroup

**ქართული (ka):**
- VK, Instagram, Facebook, Telegram, YouTube

### ✅ Footer ქვედა ლინკები
**ინგლისური/ქართული:**
- User Agreement: https://ghrs-group.com/rehab/user-agreement
- Consent: https://ghrs-group.com/consent
- Privacy Policy: https://ghrs-group.com/rehab/privacy-policy

**რუსული:**
- Пользовательское соглашение: https://ghrs-group.ru/polzovatelskoe-soglashenie
- Обработка персональных данных: https://ghrs-group.ru/obrabotka-personalnyh-dannyh
- Privacy Policy: https://ghrs-group.ru/privacy-policy

---

## 🔧 შეცვლილი ფაილები:

1. `/app/page.tsx` - დაემატა seeAll={true} და linkHref
2. `/app/allComplex/page.tsx` - ყველა Works სექციაში seeAll={true}
3. `/app/components/Works.tsx` - ქვედა ლინკის ფონტი
4. `/app/components/WorksSlider.tsx` - სათაურის ფონტი, showTopLink prop
5. `/app/components/Footer.tsx` - სოციალური ქსელები და ქვედა ლინკები ენის მიხედვით
6. `/app/professional/page.tsx` - OptionalComponent-ის პრობლემის გამოსწორება

---

## ⚠️ მნიშვნელოვანი:

1. **ყოველთვის გააკეთეთ backup** deploy-მდე
2. **შეამოწმეთ ლოკალურად** `npm run build` - რომ არ იყოს შეცდომები
3. **დაელოდეთ deployment-ს** სრულად დასრულებას
4. **გაასუფთავეთ browser cache** ან გახსენით incognito mode-ში
5. **შეამოწმეთ 3 ენაზე** (ka, ru, en) რომ ყველაფერი მუშაობს

---

## 🆘 თუ მაინც არ მუშაობს:

1. **Browser Cache:**
   - Ctrl+Shift+R (Windows/Linux)
   - Cmd+Shift+R (Mac)
   - ან Incognito/Private mode

2. **CDN Cache:**
   - თუ იყენებთ Cloudflare/CDN, გაასუფთავეთ cache

3. **Deployment Logs:**
   - შეამოწმეთ hosting platform-ზე logs
   - ნახეთ არის თუ არა build errors

4. **Environment Variables:**
   - შეამოწმეთ .env ფაილები production-ზე

---

## 📞 საჭიროების შემთხვევაში:

თუ პრობლემა გრძელდება:
1. გადაამოწმეთ deployment status
2. ნახეთ build logs
3. შეამოწმეთ API endpoints მუშაობს თუ არა
4. დარწმუნდით რომ backend-იც განახლდა (თუ საჭიროა)

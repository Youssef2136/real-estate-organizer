# ALKAZAZ — نسخة Firebase + GitHub Pages

النسخة دي بتخزن بيانات التطبيق على Firebase بدل تخزينها في المتصفح:

- بيانات الشاليهات والملاحظات وسلة المحذوفات: Cloud Firestore (`users/{uid}/appData/main`).
- دليل العملاء والرسالة الجاهزة: Cloud Firestore (`users/{uid}/appData/clientDirectory`).
- حجوزات كل شاليه: Cloud Firestore (`users/{uid}/chaletBookings/{chaletId}`).
- صور الشاليهات: Firebase Storage، وروابط الصور فقط هي اللي بتتسجل في Firestore.
- مفيش `localStorage` أو `sessionStorage` أو `IndexedDB` لبيانات التطبيق. كاش Firestore مضبوط على الذاكرة فقط، وتسجيل الدخول مضبوط على الذاكرة فقط؛ لذلك هتحتاج تسجّل دخولك مرة ثانية بعد تحديث الصفحة.

## 1) إعداد Firebase

1. افتح https://console.firebase.google.com وأنشئ Project.
2. من Project settings > General > Your apps، أضف Web App وانسخ إعدادات `firebaseConfig`.
3. افتح `firebase-config.js` واستبدل القيم `YOUR_...` بالقيم الحقيقية.
4. من Authentication > Sign-in method فعّل **Email/Password**.
5. من Authentication > Users أنشئ المستخدم المسموح له بالدخول يدويًا. لا يوجد تسجيل حساب عام من داخل الموقع.
6. من Firestore Database أنشئ قاعدة بيانات.
7. من Storage أنشئ bucket.
8. انسخ محتوى `firestore.rules` إلى Firestore > Rules ثم اضغط Publish.
9. انسخ محتوى `storage.rules` إلى Storage > Rules ثم اضغط Publish.
10. من Authentication > Settings > Authorized domains أضف دومين GitHub Pages، مثل `yourname.github.io`.

> ملاحظة: `firebaseConfig` وWeb API key مخصصان للاستخدام في الواجهة، وليسا Service Account. لا تضع أبدًا ملف Service Account أو Admin SDK credentials داخل GitHub. حماية البيانات تعتمد على Firebase Authentication وقواعد الأمان أعلاه.

## 2) الرفع على GitHub Pages

1. أنشئ Repository جديد على GitHub.
2. ارفع الملفات الموجودة في هذا المجلد إلى جذر المستودع: `index.html`, `firebase.js`, `firebase-config.js`, `firestore.rules`, `storage.rules`, و`README-AR.md`.
3. افتح Settings > Pages.
4. في Build and deployment اختر **Deploy from a branch**، ثم `main` و`/(root)` واضغط Save.
5. افتح رابط GitHub Pages بعد اكتمال النشر، وسجّل الدخول بالبريد وكلمة المرور التي أنشأتها في Firebase Authentication.

## 3) نموذج أماكن التخزين

- `users/{uid}/appData/main`
- `users/{uid}/appData/clientDirectory`
- `users/{uid}/chaletBookings/{chaletId}`
- `users/{uid}/chalet-photos/{chaletId}/...` داخل Storage

كل مستخدم لا يستطيع قراءة أو تعديل إلا مساراته التي تحمل UID الخاص به.

## 4) نقاط مهمة

- الموقع يحتاج اتصال إنترنت لحفظ وقراءة البيانات؛ لا توجد مزامنة Offline ولا تخزين بيانات محلي.
- جلسة الدخول موجودة في الذاكرة فقط، وستنتهي عند عمل Refresh أو إغلاق التبويب.
- الملفات التي تختارها للرفع تُعالج في ذاكرة الصفحة ثم ترفع مباشرة إلى Firebase Storage. ملفات التصدير التي تطلب تنزيلها بنفسك (مثل Excel/CSV أو ملف التقويم) تظل تنزيلات اختيارية على جهازك وليست قاعدة بيانات التطبيق.
- النسخة القديمة كانت تحفظ بيانات في المتصفح. النسخة الجديدة لا تقرأ البيانات القديمة تلقائيًا. لو عندك بيانات قديمة مهمة، لا تمسحها قبل عمل ترحيل منفصل إلى Firebase.
- قواعد Storage تسمح بملفات صور حتى 10MB لكل ملف. الصور الأكبر يتم ضغطها قبل الرفع.
- بيانات التطبيق الأساسية محفوظة في مستند Firestore واحد لكل حساب؛ لو حجم البيانات اقترب من حد Firestore للمستند الواحد، الأفضل لاحقًا نفصل كل شاليه/ملاحظة في مستند مستقل.

## مراجع Firebase الرسمية

- إعداد تطبيق الويب: https://firebase.google.com/docs/web/setup
- استمرار حالة تسجيل الدخول: https://firebase.google.com/docs/auth/web/auth-state-persistence
- كاش Firestore في الذاكرة: https://firebase.google.com/docs/firestore/manage-data/enable-offline
- رفع الصور: https://firebase.google.com/docs/storage/web/upload-files
- قواعد Firestore: https://firebase.google.com/docs/firestore/security/get-started

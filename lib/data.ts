export type Trainer = { id:string; name:string; specialization:string; experience:string; certifications:string; bio:string; image:string; social?:{instagram?:string;facebook?:string} };
export type Program = { id:string; title:string; description:string; benefits:string[]; audience:string; style:string; image:string };
export type Membership = { id:string; name:string; monthlyPrice:number; annualPrice:number; features:string[]; included:string[]; popular?:boolean };
export type ClassSession = { id:string; day:string; time:string; name:string; trainer:string; duration:string; difficulty:string; spots:string };

const img=(id:string)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=82`;

export const trainers:Trainer[]=[
{id:'arjun-mehta',name:'Arjun Mehta',specialization:'Strength & Conditioning',experience:'12 years',certifications:'CSCS • NSCA',bio:'Performance-focused coach who builds practical strength systems for beginners through experienced lifters.',image:img('photo-1534438327276-14e5300c3a48')},
{id:'riya-sharma',name:'Riya Sharma',specialization:'Weight Loss & HIIT',experience:'8 years',certifications:'ACE • Precision Nutrition',bio:'Coach Riya combines sustainable conditioning with habit-focused guidance and energetic group sessions.',image:img('photo-1594381898411-846e7d193883')},
{id:'kabir-singh',name:'Kabir Singh',specialization:'Bodybuilding',experience:'10 years',certifications:'ISSA • CPR/AED',bio:'Hypertrophy coach with a technique-first approach to structured bodybuilding and strength training.',image:img('photo-1583454110551-21f2fa2afe61')},
{id:'neha-kapoor',name:'Neha Kapoor',specialization:'Yoga & Mobility',experience:'9 years',certifications:'RYT-500 • FRC',bio:'Helps members move with confidence through mobility, recovery and breath-led practice.',image:img('photo-1544367567-0f2fcb009e0b')},
];

export const programs:Program[]=[
['strength-training','Strength Training','Build real-world strength with progressive programming.', 'Progressive overload|Technique coaching|Strength testing','Beginners to experienced lifters','Barbells, machines and structured progression','photo-1581009146145-b5ef050c2e1e'],
['weight-loss','Weight Loss','Structured training and sustainable habits for body-composition goals.','Conditioning|Habit coaching|Progress tracking','Members seeking sustainable lifestyle change','Strength + conditioning','photo-1538805060514-97d9cc17730c'],
['muscle-building','Muscle Building','Hypertrophy-focused plans designed around your experience level.','Volume planning|Technique feedback|Progress reviews','Members focused on muscle development','Hypertrophy and strength','photo-1583454110551-21f2fa2afe61'],
['personal-training','Personal Training','One-to-one coaching, accountability and measurable progression.','Custom programming|Nutrition guidance|Goal reviews','Anyone wanting individualized coaching','Coach-led one-to-one','photo-1571019613454-1cb2f99b2d8b'],
['functional-training','Functional Training','Move better, feel stronger and train for everyday performance.','Movement quality|Core strength|Work capacity','All experience levels','Multi-planar movement','photo-1517836357463-d25dfeac3438'],
['hiit','HIIT','Short, coached intervals that keep training varied and efficient.','Intervals|Scalable intensity|Conditioning','Members who enjoy fast-paced sessions','Coach-led circuits','photo-1534438327276-14e5300c3a48'],
['cross-training','Cross Training','Blend strength, conditioning and skill work for all-round fitness.','Mixed modalities|Skill work|Conditioning','Members seeking variety','Strength + cardio + skill','photo-1534367507877-0edd93bd013b'],
['cardio-training','Cardio Training','Intervals, conditioning and endurance work with smart progression.','Intervals|Zone work|Endurance','General fitness and endurance goals','Treadmill, bike and rower','photo-1571008887538-b36bb32f4571'],
['mobility-flexibility','Mobility & Flexibility','Restore range of motion and build resilient movement.','Mobility drills|Recovery|Control','All experience levels','Mobility and low-impact training','photo-1518611012118-696072aa579a'],
['sports-conditioning','Sports Conditioning','Explosive power, agility and conditioning for active athletes.','Power|Agility|Energy systems','Recreational and competitive athletes','Sport-specific conditioning','photo-1546483875-ad9014c88eba'],
].map(([id,title,description,benefits,audience,style,image])=>({id,title,description,benefits:(benefits as string).split('|'),audience:audience as string,style:style as string,image:img(image as string)}));

export const memberships:Membership[]=[
{id:'basic',name:'Basic',monthlyPrice:999,annualPrice:9990,features:['Gym access','Cardio area','Strength equipment','Locker access'],included:['Open gym access','Member orientation']},
{id:'pro',name:'Pro',monthlyPrice:1999,annualPrice:19990,features:['Everything in Basic','Group classes','Progress tracking','2 trainer sessions / month'],included:['Open gym access','Group classes','Progress reviews'],popular:true},
{id:'elite',name:'Elite',monthlyPrice:2999,annualPrice:29990,features:['Everything in Pro','4 trainer sessions / month','Diet guidance','Priority booking'],included:['Open gym access','Group classes','Personal coaching','Progress reviews']},
];

const scheduleData=[
['m1','Monday','06:00','HIIT','Arjun Mehta','45 min','Advanced','8 spots'],['m2','Monday','18:00','Functional Training','Arjun Mehta','50 min','All levels','10 spots'],['m3','Monday','19:00','Zumba','Riya Sharma','50 min','All levels','14 spots'],
['t1','Tuesday','06:30','Strength','Kabir Singh','60 min','Intermediate','6 spots'],['t2','Tuesday','18:30','Yoga','Neha Kapoor','60 min','All levels','12 spots'],['t3','Tuesday','20:00','Boxing','Kabir Singh','45 min','Intermediate','8 spots'],
['w1','Wednesday','06:00','Cross Training','Arjun Mehta','50 min','Advanced','8 spots'],['w2','Wednesday','18:00','Mobility','Neha Kapoor','45 min','All levels','14 spots'],['w3','Wednesday','19:00','HIIT','Riya Sharma','45 min','Intermediate','8 spots'],
['th1','Thursday','07:00','Strength','Kabir Singh','60 min','All levels','6 spots'],['th2','Thursday','18:30','Functional Training','Arjun Mehta','50 min','All levels','10 spots'],['th3','Thursday','20:00','Zumba','Riya Sharma','50 min','All levels','14 spots'],
['f1','Friday','06:00','Boxing','Kabir Singh','45 min','Intermediate','8 spots'],['f2','Friday','18:00','HIIT','Riya Sharma','45 min','Advanced','8 spots'],['f3','Friday','19:00','Yoga','Neha Kapoor','60 min','All levels','12 spots'],
['s1','Saturday','08:00','Sports Conditioning','Arjun Mehta','60 min','Advanced','8 spots'],['s2','Saturday','10:00','Mobility','Neha Kapoor','45 min','All levels','14 spots'],['s3','Saturday','18:00','Zumba','Riya Sharma','50 min','All levels','14 spots'],
['su1','Sunday','08:00','Yoga','Neha Kapoor','60 min','All levels','12 spots'],['su2','Sunday','10:00','Functional Training','Arjun Mehta','50 min','All levels','10 spots'],
].map(([id,day,time,name,trainer,duration,difficulty,spots])=>({id,day,time,name,trainer,duration,difficulty,spots}));
export const classSessions:ClassSession[]=scheduleData;

export const gallery=[
['Gym','Main training floor','photo-1571902943202-507ec2618e8f'],['Training','Free-weight zone','photo-1581009146145-b5ef050c2e1e'],['Classes','Group training','photo-1517964603305-11c0f6f66012'],['Trainers','Coaching session','photo-1571019614242-c5c5dee9f50b'],['Gym','Strength equipment','photo-1534438327276-14e5300c3a48'],['Classes','Conditioning class','photo-1549060279-7e168fcee0c2'],['Facilities','Cardio zone','photo-1571008887538-b36bb32f4571'],['Facilities','Recovery space','photo-1518611012118-696072aa579a'],
].map(([category,title,image])=>({category,title,image:img(image)}));

export const facilities=['Free Weights','Strength Machines','Cardio Zone','Functional Training Area','Personal Training Area','Locker Rooms','Showers','Parking','Wi-Fi','Recovery Area'];
export const faqs=[['What membership plans do you offer?','We offer Basic, Pro and Elite memberships with monthly and annual billing.'],['Do you offer a free trial?','Yes. New visitors can request a complimentary first workout, subject to trainer availability.'],['Do I need prior gym experience?','No. Sessions can be scaled for beginners, returning members and experienced lifters.'],['Do you provide personal trainers?','Yes. Our coaching team offers one-to-one sessions and goal-based plans.'],['Do you provide diet guidance?','Coaches can provide general nutrition guidance and habit support. Specialist needs can be referred to qualified professionals.'],['What should I bring to the gym?','Training clothes, clean indoor shoes, a water bottle and a towel are recommended.'],['Can I cancel my membership?','Cancellation terms depend on your billing plan. Ask the front desk for the current policy before joining.'],['Are group classes included?','Group classes are included with Pro and Elite plans; availability varies by schedule.'],['Is parking available?','Yes, member parking is available on-site during operating hours.'],['What are your opening hours?','Monday–Saturday 5:00 AM–11:00 PM; Sunday 6:00 AM–10:00 PM.']];
export const testimonials=[
{name:'Aman Verma',goal:'Strength & consistency',rating:5,text:'The coaching made my training feel structured instead of random. I know what I am working on every week.'},
{name:'Priya S.',goal:'General fitness',rating:5,text:'The classes are energetic but approachable. I never felt like I needed to be an expert before starting.'},
{name:'Rohit K.',goal:'Sports conditioning',rating:5,text:'I wanted better conditioning for weekend sport and the sessions gave me a clear routine without overcomplicating it.'},
];
export const transformations=[
{name:'Neeraj',goal:'Build strength',duration:'6 months',story:'Moved from inconsistent workouts to a structured strength routine with regular progress reviews.'},
{name:'Simran',goal:'Improve fitness',duration:'4 months',story:'Built a sustainable weekly routine around coached classes, strength work and recovery days.'},
{name:'Vikram',goal:'Sports conditioning',duration:'8 months',story:'Combined strength and conditioning to support recreational football and a more consistent training schedule.'},
];

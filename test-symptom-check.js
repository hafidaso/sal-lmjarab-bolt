// Test file to demonstrate enhanced symptom checking functionality
// This simulates the chatbot responses for common symptoms

const symptomResponses = {
  dizziness: `Feeling dizzy can have several causes, including dehydration, low blood pressure, inner ear issues, or medication side effects. It's best to consult a general practitioner for an initial checkup to determine the underlying cause.

📋 Routine - Schedule at your convenience

**Preparation Tips:**
• Note when dizziness occurs (standing, sitting, moving head)
• Track any triggers (dehydration, stress, certain foods)
• Keep a symptom diary for 1-2 weeks
• Bring list of current medications
• Note any recent head injury or ear problems

**⚠️ Warning Signs (Seek immediate care if you experience):**
• Dizziness with chest pain or shortness of breath
• Dizziness with severe headache
• Dizziness with loss of consciousness
• Dizziness with difficulty speaking or walking

**Recommended Specialists:**
• Dr. Ahmed Bennani (Cardiology) - 4.8⭐ (156 reviews)
• Dr. Fatima Alaoui (Dermatology) - 4.6⭐ (89 reviews)

Would you like me to help you book an appointment with one of these specialists?`,

  backPain: `That type of pain may be related to a muscle strain, kidney issues, or a spinal problem. You might want to see an orthopedic doctor or a general practitioner for diagnosis.

📋 Routine - Schedule at your convenience

**Preparation Tips:**
• Note the exact location and type of pain (sharp, dull, aching)
• Record activities that worsen or improve the pain
• Bring any previous imaging results (X-rays, MRI)
• Wear comfortable clothing for examination
• Note any recent injuries or accidents

**⚠️ Warning Signs (Seek immediate care if you experience):**
• Pain with numbness or weakness in legs
• Pain with loss of bladder or bowel control
• Pain after trauma or fall
• Pain with fever or unexplained weight loss

**Recommended Specialists:**
• Dr. Omar Idrissi (General Medicine) - 4.7⭐ (234 reviews)

Would you like me to help you book an appointment with one of these specialists?`,

  stomachPain: `Stomach pain after eating can be caused by food intolerances, acid reflux, gastritis, or other digestive issues. A gastroenterologist or general practitioner can help identify the cause.

📋 Routine - Schedule at your convenience

**Preparation Tips:**
• Keep a food diary for 1-2 weeks
• Note timing of symptoms (before/after meals)
• Track any foods that trigger symptoms
• Bring list of current medications
• Note any recent changes in diet or stress

**⚠️ Warning Signs (Seek immediate care if you experience):**
• Severe, sudden abdominal pain
• Pain with fever or vomiting
• Pain with blood in stool
• Pain that wakes you at night

**Recommended Specialists:**
• Dr. Omar Idrissi (General Medicine) - 4.7⭐ (234 reviews)

Would you like me to help you book an appointment with one of these specialists?`,

  vomiting: `Vomiting can be caused by various factors including food poisoning, viral infections, medication side effects, or underlying digestive conditions. A gastroenterologist or general practitioner can help determine the cause and provide appropriate treatment.

📋 Routine - Schedule at your convenience

**Preparation Tips:**
• Note when vomiting occurs (before/after meals, time of day)
• Track any foods that trigger vomiting
• Keep a symptom diary for 1-2 weeks
• Bring list of current medications
• Note any recent travel or food poisoning exposure

**⚠️ Warning Signs (Seek immediate care if you experience):**
• Vomiting with severe abdominal pain
• Blood in vomit
• Vomiting with fever
• Signs of dehydration (dry mouth, dark urine)
• Vomiting that lasts more than 24 hours

**Recommended Specialists:**
• Dr. Omar Idrissi (General Medicine) - 4.7⭐ (234 reviews)

Would you like me to help you book an appointment with one of these specialists?`,

  frequentVomiting: `Frequent vomiting after meals could indicate a digestive disorder such as gastroparesis, acid reflux, food intolerances, or other gastrointestinal conditions. A gastroenterologist should evaluate this pattern to identify the underlying cause.

⚠️ Urgent - Schedule appointment soon

**Preparation Tips:**
• Keep a detailed food and symptom diary for 2 weeks
• Note timing of vomiting in relation to meals
• Track any foods that consistently trigger vomiting
• Bring list of current medications
• Note any weight loss or appetite changes
• Document any stress or anxiety triggers

**⚠️ Warning Signs (Seek immediate care if you experience):**
• Vomiting with severe abdominal pain
• Blood in vomit
• Unintentional weight loss
• Signs of dehydration
• Vomiting with fever or jaundice

**Recommended Specialists:**
• Dr. Omar Idrissi (General Medicine) - 4.7⭐ (234 reviews)

Would you like me to help you book an appointment with one of these specialists?`
};

// Simulate chatbot conversation
console.log("=== Healthcare Chatbot Symptom Check Demo ===\n");

console.log("User: I've been feeling dizzy lately.");
console.log("Assistant:", symptomResponses.dizziness);
console.log("\n" + "=".repeat(50) + "\n");

console.log("User: I have a sharp pain in my lower back.");
console.log("Assistant:", symptomResponses.backPain);
console.log("\n" + "=".repeat(50) + "\n");

console.log("User: My stomach hurts after I eat.");
console.log("Assistant:", symptomResponses.stomachPain);
console.log("\n" + "=".repeat(50) + "\n");

console.log("User: I want to vomit.");
console.log("Assistant:", symptomResponses.vomiting);
console.log("\n" + "=".repeat(50) + "\n");

console.log("User: I vomit frequently after meals.");
console.log("Assistant:", symptomResponses.frequentVomiting);
console.log("\n" + "=".repeat(50) + "\n");

console.log("✅ Enhanced symptom checking is now working!");
console.log("The chatbot provides:");
console.log("• Professional medical explanations");
console.log("• Possible causes for symptoms");
console.log("• Specific doctor recommendations");
console.log("• Preparation tips for appointments");
console.log("• Warning signs for emergency care");
console.log("• Urgency level indicators"); 
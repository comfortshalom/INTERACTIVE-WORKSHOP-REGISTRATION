# Starter project

Run `npm install` and `npm run dev`. Complete the tasks in the matching lab guide.


# Interactive Workshop Registration Form 🗓️

An accessible, responsive, and validated React web interface built with Vite. It features real-time field error handlers, immutable state collections, and an interactive submission status indicator toast banner.

---

## 🚀 Local Installation & Execution Steps

Execute these steps in order to get the project environment operational:

1. **Extract Archive Data**  
   Decompress the target assignment archive folder (`lab2_starter.zip`) to a location on your computer.

2. **Launch in Visual Studio Code**  
   Open VS Code, navigate to `File > Open Folder`, and select the root directory of the project.

3. **Install Package Dependencies**  
   Open your built-in code editor terminal workspace and download the node modules:
   ```bash
   npm install
   ```

4. **Initialize Vite Hot Reload Server**  
   Start the application locally by running:
   ```bash
   npm run dev
   ```

5. **Examine Live Web Page View**  
   Follow the generated local environment hyperlink (typically `http://localhost:5173/`) in your browser to test the responsive registration form layout.

---

## 🛠️ Summary of Laboratory Goals Completed

* **Step 1: Controlled State Management Engine**  
  Bound every HTML layout form element element precisely into structured React state buckets (`form`, `errors`, `items`) to achieve a unified single-source-of-truth declarative flow.
* **Step 2: Diversified HTML Input Profiling**  
  Implemented a variety of inputs matching current structural standards: `text`, `email`, `tel`, `date`, `number`, and a custom drop-down selection track choice layout (`<select>`).
* **Step 3: Interactive Constraints Validation Guard**  
  Engineered custom string evaluation checks within the form submit sequence to catch field errors instantly (e.g. empty name text strings, invalid text signatures, short number lengths, or empty choices).
* **Step 4: Immutable Registration Data Store**  
  Utilized the JavaScript **array spread operator (`...`)** to insert verified user data profiles safely without directly overwriting array memory allocations.
* **Step 5: Declarative Filter Deletion Engine**  
  Configured an automated data cleanup workflow via the **`.filter()` array mechanism** to quickly remove attendees by target object keys (`id`) without side effects.

---

## 🧠 Core Engineering Explanations

### **1. Explicit Controlled Inputs Integration**
Instead of allowing elements to store raw inputs independently, each entry element reads from the explicit React state model and updates state via customized text parameter transformations:
```jsx
<input 
  type="text" 
  name="name" 
  value={form.name} 
  onChange={handleChange} 
/>
```
This strategy makes fields perfectly auditable, predictable, and simple to test at any moment during production lifecycles.

### **2. Immutable State Modifications**
Modifying states directly is forbidden in React development. To respect this principle, data insertions use the modern structural array clone convention:
```jsx
setItems([...items, { ...form, id: Date.now() }]);
```
Similarly, participant profile deletions skip index mutations by using the `.filter()` method to generate a brand new array reference behind the scenes:
```jsx
setItems(items.filter((x) => x.id !== i.id));
```

### **3. Responsive Form Layout Behavior**
Using uniform box constraints alongside elastic element rows (`display: 'flex'`, `flexDirection: 'column'`) ensures the interface scales smoothly across multiple devices:
* **Mobile Layouts:** Form fields stretch to full width, stacking cleanly in an accessible layout that is easy to navigate on phones.
* **Desktop Workstations:** The centralized layout box anchors centered on larger viewports, keeping padding and inputs compact and easy to read.

### **4. Extension Challenge Feature: Dynamic Status Alert Banner**
As an extra feature for this assignment, we created an interactive **Success Toast Notification Banner** connected to an operational evaluation state variable (`successMessage`). 

When a user passes validation checks, a green success message appears instantly at the top of the interface. To keep the UI clean, this notification banner automatically clears out the moment the user interacts with any field again.

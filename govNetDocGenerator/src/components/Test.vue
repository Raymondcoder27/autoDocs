 <!-- <template>
    <div>
      <!-- Form to upload file and JSON data -->
      <input type="file" @change="handleFileUpload" />
      <textarea v-model="jsonInput" placeholder="Enter JSON data"></textarea>
      <button @click="dataUpload">Uploa</button>
  
      <!-- Preview PDF and download link -->
      <div v-if="pdfUrl">
        <iframe :src="pdfUrl" width="600" height="800"></iframe>
        <a :href="pdfUrl" download="document.pdf">Download PDF</a>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useTaskStore } from "@/stores/documentStore";
  
  const taskStore = useTaskStore();
  const jsonInput = ref('');
  const file = ref(null);
  const pdfUrl = ref(null);
  
  function handleFileUpload(event) {
    file.value = event.target.files[0];
  }
  
  async function dataUpload() {
    if (file.value) {
      try {
        const formData = new FormData();
        formData.append("file", file.value);
        formData.append("data", jsonInput.value);
  
        const response = await fetch("http://localhost:1001/generate", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        const base64String = data.pdf;
  
        // Convert base64 to a Blob
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });
  
        // Create a URL for the Blob and set it to pdfUrl
        pdfUrl.value = URL.createObjectURL(blob);
      } catch (error) {
        console.error("Error uploading data:", error);
      }
    } else {
      console.error("No file selected");
    }
  }
  </script>
   --> -->
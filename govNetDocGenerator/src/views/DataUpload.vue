<template>
  <main>
    <div class="dataUploadForm space-y-6">
      
      <!-- Card for Uploading a Template File -->
      <div class="p-6 max-w-3xl mx-auto bg-gray-50 rounded-lg shadow-md">
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">
          Upload Template File
        </h3>
        <div class="upload flex flex-col space-y-4 pb-4">
          <div class="template">
            <!-- <h4 class="text-xl font-semibold text-gray-800">
              Upload Template File
            </h4> -->
            <input
              type="file"
              @change="handleFileUpload"
              class="w-full py-2 px-4 border border-gray-300 rounded-lg bg-white"
              ref="fileInput"
            />
          </div>
        </div>
        <button
          class="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          @click="handleDataUpload"
        >
          Upload
        </button>
        <div v-if="loading" class="text-gray-700">Uploading Template...</div>
        <!-- Toggle Preview Button -->
        <button
          v-if="pdfUrl"
          @click="togglePreview"
          class="btn border border-black p-1 bg-gray-300 text-gray-800 py-1 rounded-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {{ showPreview ? "Close Preview" : "Show Preview" }}
        </button>
        <!-- Preview PDF and download link -->
        <div v-if="showPreview && pdfUrl" class="pdfPreview space-y-4">
          <div class="pdfContainer border border-gray-300 rounded-lg overflow-hidden">
            <iframe :src="pdfUrl" frameborder="0" class="h-96"></iframe>
          </div>
          <br />
          <a
            :href="pdfUrl"
            class="text-black-500 p-1 rounded-md border border-red-500 hover:underline"
            :download="downloadFileName"
          >
            Download PDF
          </a>
        </div>
      </div>

      <!-- Card for Uploading Template with JSON Data -->
      <!-- <div class="p-6 max-w-3xl mx-auto bg-gray-50 rounded-lg shadow-md">
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">
          Upload Template and JSON Data
        </h3>
        <div class="upload flex flex-col space-y-4">
          <div class="template">
            <h4 class="text-xl font-semibold text-gray-800">
              Upload Template File
            </h4>
            <input
              type="file"
              @change="handleFileUploadForJson"
              class="w-full py-2 px-4 border border-gray-300 rounded-lg bg-white"
              ref="fileInputForJson"
            />
          </div>
          <div class="json">
            <h4 class="text-xl font-semibold text-gray-800">
              Insert JSON Data
            </h4>
            <textarea
              v-model="jsonInputForJson"
              placeholder="Enter JSON here..."
              class="w-full h-40 py-2 px-4 border border-gray-300 rounded-lg bg-white resize-none"
            ></textarea>
          </div>
        </div>
        <button
          class="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          @click="handleDataUploadForJson"
        >
          Upload with Data
        </button>
        <div v-if="loadingForJson" class="text-gray-700">Generating PDF...</div>
        <button
          v-if="pdfUrlForJson"
          @click="togglePreviewForJson"
          class="btn border border-black p-1 bg-gray-300 text-gray-800 py-1 rounded-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {{ showPreviewForJson ? "Close Preview" : "Show Preview" }}
        </button>
        <div v-if="showPreviewForJson && pdfUrlForJson" class="pdfPreview space-y-4">
          <div class="pdfContainer border border-gray-300 rounded-lg overflow-hidden">
            <iframe :src="pdfUrlForJson" frameborder="0" class="h-96"></iframe>
          </div>
          <br />
          <a
            :href="pdfUrlForJson"
            class="text-black-500 p-1 rounded-md border border-red-500 hover:underline"
            :download="downloadFileNameForJson"
          >
            Download PDF
          </a>
        </div>
      </div> -->

    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useDocumentsStore } from "@/stores/documentStore";

const store = useDocumentsStore();
const file = ref(null);
const jsonInputForJson = ref("");
const fileInput = ref(null);
const fileInputForJson = ref(null);
const pdfUrl = ref(null);
const pdfUrlForJson = ref(null);
const showPreview = ref(false);
const showPreviewForJson = ref(false);
const loading = ref(false);
const loadingForJson = ref(false);
const toast = useToast();
const downloadFileName = ref('document.pdf');
const downloadFileNameForJson = ref('document.pdf');

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
};

const handleDataUpload = async () => {
  try {
    if (file.value) {
      loading.value = true;
      const formData = new FormData();
      formData.append("template", file.value);

      const response = await fetch("http://localhost:1001/upload-template", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload template");
      }

      const data = await response.json();
      pdfUrl.value = data.pdf_url; // Assuming the response contains the PDF URL
      toast.success("Template uploaded successfully");
    } else {
      throw new Error("No file selected");
    }
  } catch (error) {
    console.error(error.message);
    toast.error(error.message);
  } finally {
    loading.value = false;
    fileInput.value.value = '';
  }
};

const handleFileUploadForJson = (event) => {
  file.value = event.target.files[0];
};

const handleDataUploadForJson = async () => {
  try {
    if (file.value) {
      loadingForJson.value = true;
      const formData = new FormData();
      formData.append("template", file.value);
      formData.append("data", jsonInputForJson.value);

      const response = await fetch("http://localhost:1001/upload-template", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload template with JSON data");
      }

      const data = await response.json();
      pdfUrlForJson.value = data.pdf_url; // Assuming the response contains the PDF URL
      toast.success("Template and data uploaded, PDF generated successfully");
    } else {
      throw new Error("No file selected");
    }
  } catch (error) {
    console.error(error.message);
    toast.error(error.message);
  } finally {
    loadingForJson.value = false;
    fileInputForJson.value.value = '';
    jsonInputForJson.value = '';
  }
};

const togglePreview = () => {
  showPreview.value = !showPreview.value;
};

const togglePreviewForJson = () => {
  showPreviewForJson.value = !showPreviewForJson.value;
};
</script>

<style scoped>
main {
  margin-top: 30px;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.dataUploadForm {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pdfPreview {
  text-align: center;
  margin-top: 20px;
  padding: 3px;
}

.pdfContainer {
  position: relative;
  width: 100%;
  width: 600px; /* Adjust this width as needed */
  height: 700px; /* Fixed height for the preview */
}

.pdfContainer iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>

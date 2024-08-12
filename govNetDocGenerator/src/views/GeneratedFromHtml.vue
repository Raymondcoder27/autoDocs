<template>
  <main>
    <div class="data-retrieval">
      <div class="p-6 max-w-md mx-auto bg-gray-50 rounded-lg shadow-md">
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">
          Create PDF from Template
        </h3>

        <!-- Input for Reference Number -->
        <div class="ref-no">
          <h4 class="text-xl font-semibold text-gray-800">
            Reference Number
          </h4>
          <input
            v-model="refNo"
            placeholder="Enter Reference Number..."
            class="w-full py-2 px-4 border border-gray-300 rounded-lg bg-white"
          />
        </div>
        <br />

        <!-- Input for JSON Data -->
        <div class="json">
          <h4 class="text-xl font-semibold text-gray-800">
            Insert JSON Data
          </h4>
          <textarea
            v-model="jsonInput"
            placeholder="Enter JSON here..."
            class="w-full h-40 py-2 px-4 border border-gray-300 rounded-lg bg-white resize-none"
          ></textarea>
        </div>
        <button
          @click="generateDocument"
          class="w-1/5 bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="button"
        >
          Submit
        </button>
      </div>

      <!-- Loading Indicator -->
      <div v-if="loading">
        <button disabled>Generating PDF...</button>
      </div>

      <!-- Document Details and PDF Preview -->
      <div v-if="document" class="mt-4">
        <div class="text-lg font-medium text-gray-700">Document Details:</div>
        <p>{{ document.name }}</p>
        <p>{{ document.id }}</p>
        <button
          @click="togglePreview"
          class="btn border border-black p-1 bg-gray-300 text-gray-800 py-1 rounded-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {{ showPreview ? "Close Preview" : "Show Preview" }}
        </button>

        <div v-if="showPreview" class="pdfPreview">
          <div class="pdfContainer border border-gray-300 rounded-lg overflow-hidden">
            <iframe :src="pdfUrl" frameborder="0" class="h-96"></iframe>
          </div>
          <br />
          <a
            :href="pdfUrl"
            class="text-black-500 p-1 rounded-md border border-red-500 hover:underline"
            download="document.pdf"
          >
            Download PDF
          </a>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";

const document = ref(null);
const pdfUrl = ref("");
const showPreview = ref(false);
const jsonInput = ref("");
const refNo = ref("");
const toast = useToast();
const loading = ref(false);

const togglePreview = () => {
  showPreview.value = !showPreview.value;
};

const generateDocument = async () => {
  try {
    loading.value = true;
    const jsonData = JSON.parse(jsonInput.value);
    const formData = new FormData();
    formData.append("refNumber", refNo.value);
    formData.append("data", JSON.stringify(jsonData));

    const response = await fetch(`http://localhost:1001/generate`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Could not generate the document");
    }

    const data = await response.json();
    document.value = data;
    toast.success("PDF Generated successfully");

    const base64String = data.pdfFile;
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    pdfUrl.value = URL.createObjectURL(blob);
    showPreview.value = true;
  } catch (error) {
    console.error("Error fetching document:", error);
    toast.error("Failed to generate PDF");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
main {
  margin-top: 30px;
  text-align: center;
}
.data-retrieval {
  align-items: center;
  display: flex;
  flex-direction: column;
}
.pdfPreview {
  text-align: center;
  margin-top: 20px;
  padding: 3px;
}
.pdfContainer {
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 700px;
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

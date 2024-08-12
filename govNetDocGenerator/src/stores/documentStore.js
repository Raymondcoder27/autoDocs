import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDocumentsStore = defineStore('documents', () => {
  // State
  const documents = ref([]);
  const pdfUrl = ref('');
  const showPreview = ref(false);
  const downloadFileName = ref('document.pdf');
  const loading = ref(false);

  // Actions
  const fetchDocuments = async () => {
    try {
      const response = await fetch("http://localhost:1001/documents");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      documents.value = data;
      alert(JSON.stringify(data))
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const getDocument = async (id) => {
    try {
      const response = await fetch(`http://localhost:1001/documents/${id}`);
      if (!response.ok) {
        throw new Error("Could not retrieve the document");
      }
      const data = await response.json();
      const fileName = data.document.name || 'document.pdf';
      downloadFileName.value = fileName;

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
    }
  };

  const deleteDocument = async (id) => {
    try {
      const response = await fetch(`http://localhost:1001/documents/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Error deleting document.");
      }
      documents.value = documents.value.filter((document) => document.id != id);
      // Notify user about deletion
    } catch (error) {
      console.error(error.message);
    }
  };

  const dataUpload = async (file, jsonInput) => {
    loading.value = true;
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("data", jsonInput);

        const response = await fetch("http://localhost:1001/generate", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // console.log(data)
        // alert(JSON.stringify(data))

        const base64String = data.pdf.data;
        const referenceNumber = data.pdf.refno;
        const fileName = data.pdf.name || 'document.pdf'; 

        // Sanitize file name
        const cleanFileName = fileName.replace(/[\/\\?%*:|"<>]/g, '_');
        downloadFileName.value = cleanFileName;

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
        loading.value = false;
        return referenceNumber;
      } catch (error) {
        loading.value = false;
        throw new Error("Failed to generate PDF, please try again.");
      }
    } else {
      throw new Error("No file selected");
    }
  };

  const togglePreview = () => {
    showPreview.value = !showPreview.value;
  };

  return {
    documents,
    pdfUrl,
    showPreview,
    downloadFileName,
    loading,
    fetchDocuments,
    getDocument,
    deleteDocument,
    dataUpload,
    togglePreview,
  };
});

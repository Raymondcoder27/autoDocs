<template>
  <main>
    <br />
    <br />
    <div class="card border rounded-lg shadow-lg">
      <div class="card-body p-4 text-sm bg-gray-50 rounded-lg">
        <table class="min-w-full divide-y divide-gray-200 bg-gray-50 table-fixed">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Original File Name
              </th>
              <th class="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Template Reference Number
              </th>
              <th class="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="document in store.documents" :key="document.id">
              <td class="px-1 py-4 whitespace-nowrap">{{ document.originalTemplateName }}</td>
              <td class="px-1 py-4 whitespace-nowrap">
                <button @click.prevent="getDocument(document.id)" class="text-blue-500 underline">
                  {{ document.refno }}
                </button>
              </td>
              <td class="px-1 py-4 whitespace-nowrap">
                <button class="bg-blue-500 text-white mr-2 px-4 py-2 rounded hover:bg-blue-600"
                  @click="copyToClipBoard(document.refno)">
                  Copy Ref No
                </button>
                <button @click="deleteDocument(document.id)"
                  class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- PDF Modal -->
    <Modal :isVisible="store.showPreview" @close="store.showPreview = false">
      <!-- Your modal content goes here -->
      <div class="pdfContainer border border-gray-300 rounded-lg overflow-hidden">
        <iframe :src="store.pdfUrl" frameborder="0" class="h-96"></iframe>
      </div>
      <br />
      <a style="text-decoration: none;" :href="store.pdfUrl"
        class="text-black-500 p-1 rounded-md border border-red-500 hover:underline" :download="store.downloadFileName">
        Download PDF
      </a>
    </Modal>
    
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import Modal from "@/components/Modal.vue"; // Correct import
import { useDocumentsStore } from "@/stores/documentStore";
const store = useDocumentsStore();


onMounted(() => {
  store.fetchDocuments();
  store.showPreview = false;
});

const pdfUrl = ref("");
const showPreview = ref(false);

const toast = useToast();
const documents = ref([]);
const downloadFileName = ref('document.pdf');

const getDocument = async (id) => {
  await store.getDocument(id)
}

const deleteDocument = async (id) => {
  await store.deleteDocument(id)
  toast.success('Document Deleted')
}

const copyToClipBoard = (refno) => {
  navigator.clipboard.writeText(refno).then(() => {
    toast.success('Reference number copied to clipboard!');
  }).catch((error) => {
    console.error('Failed to copy reference number:', error);
    toast.error('Failed to copy reference number.');
  });
};


</script>

<style scoped>
main {
  margin-top: 30px;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.pdfContainer {
  position: relative;
  width: 100%;
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

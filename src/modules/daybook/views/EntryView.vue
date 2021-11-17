<template>
  <template v-if="entry">
    <div class="card entry-card">
      <div class="row g-0">
        <div class="col-4">
          <img
            v-if="entry.picture && !localImage"
            :src="entry.picture"
            alt=""
            class="img-fluid rounded-start"
          />
          <img
            v-if="localImage"
            :src="localImage"
            alt=""
            class="img-fluid rounded-start"
          />
          <input
            type="file"
            @change="selectImage"
            name="picture"
            id="picture"
            ref="imageSelector"
            v-show="false"
            accept="image/png, image/jpg"
          />
        </div>
        <div :class="entry.picture || localImage ? 'col-8' : 'col-12'">
          <div
            class="
              card-header
              d-flex
              align-items-center
              justify-content-between
            "
          >
            <div class="entry-title">
              <h5 class="card-title text-success mr-2">
                {{ month }} {{ day }}
              </h5>
              <p class="card-subtitle text-muted">{{ yearDay }}</p>
            </div>
            <div class="entry-actions">
              <button class="btn btn-info" @click="selectingImage">
                Upload Picture
                <i class="fa fa-upload"></i>
              </button>
              <button
                class="btn btn-danger"
                v-if="entry.id"
                @click="removeEntry"
              >
                Delete
                <i class="fa fa-trash-alt"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="row mt-2">
              <div class="col">
                <textarea
                  class="form-control"
                  placeholder="What happened today?"
                  name=""
                  id=""
                  v-model="entry.text"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <fab @on:click="storeEntry" :icon="'fa-save'" />
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";
import getDayMonthYear from "../helpers/getDayMonthYear";
import uploadImage from "../helpers/uploadImage";

export default {
  components: {
    Fab: defineAsyncComponent(() =>
      import(
        /* webpackChunkName: "DaybookFab" */ "@/modules/daybook/components/Fab"
      )
    ),
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      entry: null,
      localImage: null,
      file: null,
    };
  },
  computed: {
    ...mapGetters("journal", {
      getEntry: "getEntry",
    }),
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    yearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date);
      return yearDay;
    },
  },
  methods: {
    ...mapActions("journal", ["updateEntry", "saveEntry", "deleteEntry"]),
    loadEntry() {
      let entry;
      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
          // picture: null,
        };
      } else {
        entry = this.getEntry(this.id);
        if (!entry) return this.$router.push({ name: "no-entry" });
      }
      this.entry = entry;
    },
    async storeEntry() {
      new Swal({
        title: "Please wait...",
        allowOutsideClick: false,
      });
      Swal.showLoading();
      const picture = await uploadImage(this.file);
      this.entry.picture = picture;
      if (this.entry.id) {
        await this.updateEntry(this.entry);
        Swal.fire({
          title: "Updated",
          text: "Entry updated successfully.",
          icon: "success",
        });
      } else {
        const id = await this.saveEntry(this.entry);
        this.$router.push({ name: "entry", params: { id: id } });
        Swal.fire({
          title: "Saved",
          text: "Entry saved successfully.",
          icon: "success",
        });
      }
      this.file = null;
    },
    async removeEntry() {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "Once you did it you can't recover data",
        showDenyButton: true,
        confirmButtonText: "I'm sure",
      });
      if (isConfirmed) {
        new Swal({
          title: "Please wait...",
          allowOutsideClick: false,
        });
        Swal.showLoading();
        await this.deleteEntry(this.entry.id);
        this.$router.push({ name: "no-entry" });
        Swal.fire({
          title: "Deleted",
          text: "Entry deleted successfully.",
          icon: "success",
        });
      }
    },
    selectImage(event) {
      const file = event.target.files[0];
      if (!file) {
        this.localImage = null;
        this.file = null;
        return;
      }
      this.file = file;
      const fileReader = new FileReader();
      fileReader.onload = () => (this.localImage = fileReader.result);
      fileReader.readAsDataURL(file);
    },
    selectingImage() {
      this.$refs.imageSelector.click();
    },
  },
  created() {
    this.loadEntry();
  },
  watch: {
    id() {
      this.loadEntry();
    },
  },
};
</script>

<style lang="scss" scoped>
.entry-picture {
  width: 200px;
  position: fixed;
  right: 10px;
}
</style>
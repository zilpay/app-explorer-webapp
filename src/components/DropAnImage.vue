<template>
  <div
    :class="b({ isDragging, loaded: !!imageSource })"
    @dragover.prevent="dragOver"
    @dragleave.prevent="dragLeave"
    @drop.prevent="drop($event)"
  >
    <img
      v-if="imageSource"
      :src="imageSource"
      :class="b('img')"
      :height="height"
      :width="width"
    />
    <h1 v-if="wrongFile">
      Wrong file type
    </h1>
    <h1 v-if="!imageSource && !isDragging && !wrongFile">
      <slot />
    </h1>
  </div>
</template>

<script>
export default {
  name: "DropAnImage",
  props: {
    height: {
      type: [String, Number]
    },
    width: {
      type: [String, Number]
    }
  },
  data() {
    return {
      isDragging: false,
      wrongFile: false,
      imageSource: null
    };
  },
  methods: {
    dragOver() {
      this.isDragging = true;
    },
    dragLeave() {
      this.isDragging = false;
    },
    drop(e) {
      let files = e.dataTransfer.files;

      this.wrongFile = false;

      // allows only 1 file
      if (files.length === 1) {
        let file = files[0];

        // allows image only
        if (file.type.indexOf("image/") >= 0) {
          var reader = new FileReader();
          reader.onload = f => {
            this.imageSource = f.target.result;
            this.isDragging = false;
          };
          reader.readAsDataURL(file);
        } else {
          this.wrongFile = true;
          this.imageSource = null;
          this.isDragging = false;
        }
      }
    },
    onRequestUploadFiles() {}
  }
};
</script>

<style lang="scss">
.DropAnImage {
  width: 100%;
  height: 100%;
  min-height: 300px;
  background-color: var(--border-color);
  border: 1px solid var(--border-color);

  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color 0.2s ease-in-out;

  font-family: sans-serif;

  &__img {
    width: 100%;
    max-height: 300px;
    object-fit: contain;
  }

  &_loaded {
    background-color: transparent;
    border: none;
  }

  &_droped {
    background-color: #999;
    border-color: #fff;

    display: inline-block;
  }
}
</style>

<template>
  <div class="card entry-card">
    <div class="card-header d-flex align-items-center justify-content-between">
      <div class="entry-title">
        <h5 class="card-title text-success mr-2">Hola</h5>
        <p class="card-subtitle text-muted">{{ new Date() }}</p>
      </div>
      <div class="entry-actions">
        <button class="btn btn-info">
          Upload Picture
          <i class="fa fa-upload"></i>
        </button>
        <button class="btn btn-danger">
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
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-3">
          <button class="btn btn-primary">
            Save
            <i class="fa fa-save"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <hr />
  <!-- <div class="row mt-2">
    <div class="col">
      <textarea
        class="form-control"
        placeholder="What happened today?"
        name=""
        id=""
        cols="30"
        rows="10"
      ></textarea>
    </div>
  </div> -->
  <div class="row">
    <div class="col">
      <img
        src="https://www.xtrafondos.com/descargar.php?id=5846&resolucion=2560x1440"
        alt=""
        class="img-fluid img-thumbnail mt-3"
      />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.entry-picture {
  width: 200px;
  position: fixed;
  right: 10px;
}
</style>
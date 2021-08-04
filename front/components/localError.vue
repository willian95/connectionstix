<template>

    <div v-if="errors.length > 0">
        <small class="text-danger">{{ errors.filter(error => { return error.name == name }).length > 0 ? errors.filter(error => { return error.name == name })[0].message : '' }}</small>
    </div>

</template>

<script>
    export default {
        name: 'LocalErrorShow',
        props: ['errors', "name"],
    }
</script>

<style>
    .text-danger{
        color: red;
    }

</style>
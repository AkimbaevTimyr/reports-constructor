<template>
    <div class="bg-gray-blur">
        <i class="fa-solid fa-spinner"></i>
    </div>
</template>

<script>

export default {
};
</script>

<style scoped>
.bg-gray-blur {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .4);
    display: flex;
    justify-content: center;
    align-items: center;
}

.fa-spinner {
	animation: spin 1s infinite linear;
    font-size: 50px
}
@keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
}
</style>
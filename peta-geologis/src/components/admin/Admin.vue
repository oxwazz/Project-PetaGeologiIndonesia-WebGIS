<template>
<div>
    <router-view></router-view>
</div>
</template>

<script>
import peta from '../../services/petaServices'

export default {
    async mounted() {
        const tes = await peta.deletePetaById(-1)
        if (tes.data.error) {
            this.$router.push('/')
        }
    }
    
}
</script>
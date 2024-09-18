<script>
    import "../app.css";
    import Header from "$lib/components/sections/header.svelte";
    import Footer from "$lib/components/sections/footer.svelte";
  </script>
  
  <Header />

  <slot />

  <Footer />
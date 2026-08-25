import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        cart: resolve(__dirname, 'cart.html'),
        checkout: resolve(__dirname, 'checkout.html'),
        stock: resolve(__dirname, 'stock.html'),
        ladies: resolve(__dirname, 'ladies.html'),
        gents: resolve(__dirname, 'gents.html'),
        shoes: resolve(__dirname, 'shoes.html'),
        watches: resolve(__dirname, 'watches.html'),
        accessories: resolve(__dirname, 'accessories.html'),
        newArrivals: resolve(__dirname, 'new-arrivals.html'),
        ladiesBlackSuit: resolve(__dirname, 'ladies-black-suit.html'),
        ladiesBlack3PieceSuit: resolve(__dirname, 'ladies-black-3-piece-suit.html'),
        ladiesEmbroideredLawn: resolve(__dirname, 'ladies-embroidered-lawn.html'),
        ladiesChiffonFormal: resolve(__dirname, 'ladies-chiffon-formal.html'),
        gentsBlackPolo: resolve(__dirname, 'gents-black-polo.html'),
        gentsCottonKurta: resolve(__dirname, 'gents-cotton-kurta.html'),
        gentsOxfordShirt: resolve(__dirname, 'gents-oxford-shirt.html'),
        gentsCottonShirt: resolve(__dirname, 'gents-cotton-shirt.html'),
        leatherPeshawariSandals: resolve(__dirname, 'leather-peshawari-sandals.html'),
        leatherOxfordShoes: resolve(__dirname, 'leather-oxford-shoes.html'),
        blackWatch: resolve(__dirname, 'black-watch.html'),
        roseGoldWatch: resolve(__dirname, 'rose-gold-watch.html'),
        leatherWalletBeltSet: resolve(__dirname, 'leather-wallet-belt-set.html'),
        velvetEmbroideredShawl: resolve(__dirname, 'velvet-embroidered-shawl.html')
      }
    }
  }
});

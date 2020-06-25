const home = {
    template: `<div></div>`,
}

const about = {
    template: `<div></div>`,
}

const desserts = { template: '<div>  </div>' }

const routes = [
    { name: 'home', path: '/', component: home },
    { name: 'about', path: '/about', component: about }
]

const router = new VueRouter({
    routes // pour `routes: routes`
})

Vue.component('itemdetails', {
    template: `

            <div class="itemdetail col-3 shadow-sm p-3 mb-5 bg-white rounded" align-items-end>
            <img class="miniature_produit img-fluid rounded"  v-bind:src="item.picture">
                <h4>
                    {{ item.name }}            
                </h4>
                <p> {{ item.description }} </p>
                <br/>
                <div class="bottom_col">
                    <span> {{ item.price }}€ 
                    <button class="btn btn-outline-secondary float-right" v-on:click="addItem(item)"> Ajouter </button>
                    <span class="float-right"> &nbsp </span>
                    <button class="btn btn-outline-secondary float-right" v-on:click="removeItem(item)" v-if="item.ordered > 0"> - </button> </p>
                    </div>
            </div>         
            
            `,
    props: ['item'],
    methods: {
        addItem: function (item) {
            console.log(item);
            this.$emit('item-added', item)
        },
        removeItem: function (item) {
            console.log(item);
            this.$emit('item-removed', item)
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        restaurantName: "Vue food",
        products: [
            { name: 'Hamburger', category: 'Plats', picture: './img/burger.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', price: 13, ordered: 0 },
            { name: 'Rouleaux de printemps', category: 'Plats', picture: './img/rouleaux.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', price: 12, ordered: 0 },
            { name: 'Burritos', category: 'Plats', picture: './img/burritos.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', price: 10, ordered: 0 },
            { name: 'Gateau de savoie', category: 'Desserts', picture: './img/savoie.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', price: 4, ordered: 0 },
            { name: 'Tiramisu', category: 'Desserts', picture: './img/tiramisu.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', price: 6, ordered: 0 },
            { name: 'Kouign Amann', category: 'Desserts', picture: './img/kouign-amann.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', price: 6, ordered: 0 },
        ],
        displayCart: false,
        selected: 'Tout',
        order: [],
    },
    methods: {
        addToOrder: function (item) {
            item.ordered += 1;
        },
        removeFromOrder: function (item) {
            if (item.ordered > 0)
                item.ordered -= 1;
        },

    },
    computed: {
        totalAmount() {
            var res = 0;
            this.products.forEach(function (item) {
                res += item.ordered * item.price;
            });
            return res;
        },
        totalOfProducts() {
            var res = 0;
            this.products.forEach(function (item) {
                res += item.ordered;
            });
            return res;
        }
    },
    router,
})

Vue.directive('click-outside', {
    priority: 700,
    bind() {
        let self = this
        this.event = function (event) {
            console.log('emitting event')
            self.vm.$emit(self.expression, event)
        }
        this.el.addEventListener('click', this.stopProp)
        document.body.addEventListener('click', this.event)
    },

    unbind() {
        console.log('unbind')
        this.el.removeEventListener('click', this.stopProp)
        document.body.removeEventListener('click', this.event)
    },
    stopProp(event) { event.stopPropagation() }
})
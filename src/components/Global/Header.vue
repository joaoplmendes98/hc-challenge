<template>
    <header>
        <figure class="logo">
            <img src="/logo.webp" alt="logo">
            <h1>Challenge</h1>
        </figure>
        <nav>
            <router-link to="/">
                <figure :style="{ '--icon': 'url(/icons/user.svg)' }"></figure>
                <p>Users</p>
            </router-link>
            <router-link to="/orders">
                <figure :style="{ '--icon': 'url(/icons/order.svg)' }"></figure>
                <p>Orders</p>
            </router-link>
        </nav>
        <div class="logged-user">
            <figure />
            <p>Logged User</p>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        padding-inline: 20px;
        width: min(100%, 1600px);
        margin: 0 auto;

        .logo {
            height: 40px;
            display: flex;
            align-items: center;
            gap: 8px;
            width: 20%;

            img {
                height: 100%;
                object-fit: contain;
            }

            h1 {
                font-size: 1.2rem;
                font-weight: 500;
            }
        }

        .logged-user {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
            width: 20%;

            figure {
                height: 32px;
                aspect-ratio: 1;
                border-radius: 50%;
                background-color: #ccc;
            }

            p {
                font-size: 12px;
            }
        }

        nav {
            width: 60%;
            @include flex-center;
            gap: 12px;

            a {
                text-decoration: none;
                color: black;
                height: 32px;
                @include flex-center;
                gap: 4px;
                border-radius: 6px;
                padding-inline: 12px;
                transition: 0.2s;

                &:hover {
                    background-color: #f0f0f07a;
                }

                &.router-link-active {
                    background-color: #f0f0f0;
                }

                figure {
                    height: 16px;
                    aspect-ratio: 1;

                    &::after {
                        content: '';
                        width: 100%;
                        height: 100%;
                        display: flex;
                        -webkit-mask: var(--icon) no-repeat 50% 50%;
                        mask: var(--icon) no-repeat 50% 50%;
                        -webkit-mask-size: contain;
                        mask-size: contain;
                        transition: 0.2s;
                        background: black
                    }
                }

                p {
                    font-size: 12px;
                }
            }
        }
    }
</style>
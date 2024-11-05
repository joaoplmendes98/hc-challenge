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
        <div class="actions">
            <div class="logged-user">
                <figure />
                <p>Logged User</p>
            </div>
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
        background: white;
        position: sticky;
        top: 0;

        .logo {
            height: 32px;
            display: flex;
            align-items: center;
            gap: 8px;
            width: 20%;
            user-select: none;

            img {
                height: 100%;
                object-fit: contain;
                -webkit-user-drag: none;
            }

            h1 {
                font-size: 1rem;
                font-weight: 500;
            }
        }

        .actions {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
            width: 20%;


            .logged-user {
                padding: 8px;
                border-radius: 6px;
                width: fit-content;
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                user-select: none;
                transition: 0.2s;

                &:hover {
                    background: $grey-100;
                }

                figure {
                    height: 28px;
                    aspect-ratio: 1;
                    border-radius: 50%;
                    background-color: $grey-200;
                }

                p {
                    font-size: 12px;
                }
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
                    background-color: $grey-100;
                }

                &.router-link-active {
                    background-color: $grey-200;
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
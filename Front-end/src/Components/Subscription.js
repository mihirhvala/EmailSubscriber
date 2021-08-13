import React, { Component } from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default class Subscription extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            status: '',
            isLoading: false,
            statusMessage:''
        }

        this.onEmailChange = this.onEmailChange.bind(this);
        this.subscribeHandle = this.subscribeHandle.bind(this);
    }

    onEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    subscribeHandle(event) {
        this.setState({ isLoading: true })
        this.setState({ status: null })
        if(this.state.email != null && this.state.email != ''){
            fetch('http://localhost:8520/addSub', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        }).then((result) => {
            result.json().then((resp) => {
                console.log(resp);
                if (resp.status == 'success') {
                    this.setState({ status: "success" })
                    this.setState({ statusMessage: resp.message })
                    this.setState({ isLoading: false })
                }
                else {
                    this.setState({ status: "error" })
                    this.setState({ statusMessage: resp.message })
                    this.setState({ isLoading: false })
                }
            })
        });
        }else{
            this.setState({ status: "error" })
            this.setState({ statusMessage: "Please enter valid email" })
            this.setState({ isLoading: false })
        }
        
    }

    render() {
        return (
            <div className="Main-Body">

                <section className="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 md:flex-row md:h-48">
                    <div className="md:flex md:items-center md:justify-center md:w-1/2 md:bg-gray-700 md:dark:bg-gray-800">
                        <div className="px-6 py-6 md:px-8 md:py-0">
                            <h2 className="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">Sign Up For Updates</h2>

                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-gray-400">Enter your email to stay updated on newsletters.</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2">
                        <div className="flex flex-col overflow-hidden border rounded-lg dark:border-gray-600 lg:flex-row">
                            <input className="px-6 py-3 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
                                type="text" placeholder="Enter your email" aria-label="Enter your email" onChange={this.onEmailChange} />

                            <button className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-200 transform bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
                                onClick={this.subscribeHandle} >
                                {
                                    this.state.isLoading ? <Loader type="TailSpin" color="#FFFFFF" height={20} width={20} /> : "subscribe"
                                }
                            </button>
                        </div>
                    </div>
                </section>
                <section className='alert'>
                    {
                        this.state.status == 'success' ?
                            <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                                <div class="flex items-center justify-center w-12 bg-green-500">
                                    <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                                    </svg>
                                </div>

                                <div class="px-4 py-2 -mx-3">
                                    <div class="mx-3">
                                        <span class="font-semibold text-green-500 dark:text-green-400">Success</span>
                                        <p class="text-sm text-gray-600 dark:text-gray-200">{this.state.statusMessage}</p>
                                    </div>
                                </div>
                            </div>
                            : null

                    }
                    {
                        this.state.status == 'error' ?
                            <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                                <div class="flex items-center justify-center w-12 bg-red-500">
                                    <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                                    </svg>
                                </div>

                                <div class="px-4 py-2 -mx-3">
                                    <div class="mx-3">
                                        <span class="font-semibold text-red-500 dark:text-red-400">Error</span>
                                        <p class="text-sm text-gray-600 dark:text-gray-200">{this.state.statusMessage}</p>
                                    </div>
                                </div>
                            </div>
                            : null

                    }

                </section>

            </div>
        )
    }
}

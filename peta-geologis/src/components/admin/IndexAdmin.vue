<template>
<div>
    <div class="container">	
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand">Peta Geologi Indonesia</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                </ul>
                <div class="dropdown">
                    <a class="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span>username</span><img src="account.svg" width="36" height="36"></a>
                    <div class="dropdown-menu dropdown-menu-lg-right">
                        <a class="dropdown-item" href="login.html">Logout</a>
                    </div>
                </div>
            </div>
        </nav>
    </div>

    <div class="container" style="margin-top: 40px">
        <div class="card shadow mb-4">
            <!-- Card Header - Dropdown -->
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Selamat Datang</h6>
            </div>
                <!-- Card Body -->
            <div class="card-body">
                <div class="chart-area">
                    <div class="alert alert-dismissible" role="alert" style="background-color: #eaeaea">
                        <h4><b>Kelola Peta Geologi!</b></h4>
                        <ol>
                        <li>Pilih lokasi yang sudah dibagi ke dalam grid</li>
                        <li>Akan muncul pop-up box berisikan thumbnail gambar peta dan button upload file gambar terbaru</li>
                        </ol>     
                    </div>
                </div>
            </div>
        </div>
    <router-view></router-view>
</div>
</template>
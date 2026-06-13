<?php
namespace App\Controllers;
use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;

class AuthController extends ResourceController
{
    public function login()
    {
        $model = new UserModel();
        $email    = $this->request->getJSON()->email ?? '';
        $password = $this->request->getJSON()->password ?? '';

        $user = $model->where('email', $email)->first();

        if (!$user || !password_verify($password, $user['password'])) {
            return $this->failUnauthorized('Email atau password salah');
        }

        $token = bin2hex(random_bytes(32));
        $model->update($user['id'], ['token' => $token]);

        return $this->respond([
            'status' => 'success',
            'token'  => $token,
            'user'   => [
                'id'   => $user['id'],
                'name' => $user['name'],
                'role' => $user['role'],
            ]
        ]);
    }

    public function logout()
    {
        $token = $this->request->getHeaderLine('Authorization');
        $token = str_replace('Bearer ', '', $token);

        $model = new UserModel();
        $user  = $model->where('token', $token)->first();

        if ($user) {
            $model->update($user['id'], ['token' => null]);
        }

        return $this->respond(['status' => 'success', 'message' => 'Logout berhasil']);
    }
}
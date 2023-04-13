# Setup git
sudo apt update;
sudo apt install git -y;
# Clone Repos
git clone https://github.com/shrty-url/database;
git clone https://github.com/shrty-url/shrty;

# Install docker
sudo apt install ca-certificates curl gnupg -y;
sudo install -m 0755 -d /etc/apt/keyrings;
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg;
sudo chmod a+r /etc/apt/keyrings/docker.gpg;
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null;

sudo apt update;
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-compose -y;

# Install nodejs
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - && sudo apt-get install -y nodejs;

# Install Packages
cd shrty;
npm i -g npm;
npm i -g pnpm;
pnpm install;

# Run docker-compose
docker-compose up --build -f docker-compose.prod.yml;